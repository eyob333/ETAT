// controllers/newsController.js
/* eslint-disable camelcase */
const News = require('../models/News'); // Import the News model
const NewsLikes = require('../models/NewsLikes'); // Import the NewsLikes model
const slugify = require('slugify'); // Import slugify for generating slugs
const sequelize = require('../config/sequelize'); // Import the centralized sequelize instance for literals

// Create a new news
module.exports.addNews_post = async (req, res) => {
  const { title, body, author_name, id, source } = req.body;
  const picture = req.file ? process.env.backend + req.file.path : '';

  try {
    const user_id = id; // Assuming 'id' from req.body is meant to be user_id

    // Generate the slug from the title
    const generatedSlug = slugify(title, {
      lower: true,      // convert to lower case
      strict: true,     // strip special characters except replacements
      locale: 'en',     // language code of the locale to use
      trim: true        // trim leading/trailing replacement chars
    });

    const news = await News.create({
      title,
      body,
      picture,
      author_name,
      user_id,
      source,
      slug: generatedSlug, // <--- Add the generated slug here
    });
    res.status(201).json(news);
  } catch (error) {
    console.error('Error in addNews_post:', error); // Use console.error for errors
    // Handle unique slug constraint violation if slugify creates duplicates
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'A news item with a similar title already exists. Please choose a more unique title.' });
    }
    res.status(500).json({ error: error.message || 'Failed to add news.' });
  }
};

module.exports.newsLike_post = async (req, res) => {
  const { id } = req.params;
  let { total_likes, total_dislikes } = req.body;
  // Prevent negative values
  total_likes = typeof total_likes === 'number' ? Math.max(0, total_likes) : 0;
  total_dislikes = typeof total_dislikes === 'number' ? Math.max(0, total_dislikes) : 0;
  if (total_likes === undefined) {
    return res.status(400).json({ error: "total_likes is required" });
  }
  try {
    const existingLike = await NewsLikes.findOne({ where: { news_id: id } });
    if (existingLike) {
      await existingLike.update({ total_likes, total_dislikes });
    } else {
      await NewsLikes.create({ news_id: id, total_likes, total_dislikes });
    }
    res.status(200).json({ message: 'News like updated successfully' });
  } catch (error) {
    console.error("news likes error::", error); // Use console.error
    res.status(500).json({ error: error.message });
  }
};

// Get all news
module.exports.allNews_get = async (req, res) => {
  try {
    // News.findAll will automatically include the 'slug' column now that it's in the model
    const news = await News.findAll();
    res.status(200).json({news});
  } catch (error) {
    console.error('Error in allNews_get:', error); // Use console.error
    res.status(500).json({ error: error.message });
  }
};

// Get a specific news by slug
module.exports.news_get = async (req, res) => {
  const { slug } = req.params;
  try {
    const news = await News.findOne({
      where: { slug },
      attributes: {
        include: [
          [
            // Use the imported sequelize instance for literal
            sequelize.literal('COALESCE((SELECT total_likes FROM "newsLikes" WHERE "newsLikes"."news_id" = "News"."id"), 0)'),
            'like_count'
          ],
          [
            // Use the imported sequelize instance for literal
            sequelize.literal('COALESCE((SELECT total_dislikes FROM "newsLikes" WHERE "newsLikes"."news_id" = "News"."id"), 0)'),
            'dislike_count'
          ]
        ]
      }
    });
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json({ news });
  } catch (error) {
    console.error('Error in news_get:', error); // Use console.error
    res.status(500).json({ error: error.message });
  }
};

// Update a specific news
module.exports.updateNews_post = async (req, res) => {
  const newsId = req.params.id;
  const updatedNewsData = req.body; // Use a different variable name to avoid confusion with the model instance

  try {
    const news = await News.findByPk(newsId);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    // Check if the title is being updated and generate a new slug if it changed
    if (updatedNewsData.title && updatedNewsData.title !== news.title) {
      updatedNewsData.slug = slugify(updatedNewsData.title, {
        lower: true,
        strict: true,
        locale: 'en',
        trim: true,
      });
    }

    // Apply updates from req.body
    Object.assign(news, updatedNewsData);

    // Handle picture update if a new file is uploaded
    if (req.file) {
      news.picture = process.env.backend + req.file.path;
    }

    news.updatedAt = new Date(); // Ensure updatedAt is explicitly set or rely on Sequelize's default
    await news.save(); // Save the updated news item

    res.status(200).json({ news });
  } catch (err) {
    console.error('Error in updateNews_post:', err); // Use console.error
    // Handle unique slug constraint violation during update
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'A news item with this title (and thus slug) already exists.' });
    }
    res.status(500).json({ error: err.message || 'Failed to update news.' });
  }
};

// Delete a specific news
module.exports.deleteNews_post = async (req, res) => {
  const newsId = req.params.id;

  try {
    const news = await News.findByPk(newsId);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    await news.destroy();
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (err) {
    console.error('Error in deleteNews_post:', err); // Use console.error
    res.status(400).json({ error: err.message });
  }
};

// controllers/newsController.js
module.exports.getNewsLikes = async (req, res) => {
  const { id } = req.params;

  try {
    const newsLike = await NewsLikes.findOne({ where: { news_id: id } });

    if (!newsLike) {
      // If no likes/dislikes entry exists, return 0 for both
      return res.status(200).json({
        news_id: parseInt(id), // Ensure ID is parsed to integer
        total_likes: 0,
        total_dislikes: 0,
      });
    }

    res.status(200).json({
      news_id: newsLike.news_id,
      total_likes: newsLike.total_likes,
      total_dislikes: newsLike.total_dislikes,
    });
  } catch (error) {
    console.error('Get likes error:', error);
    res.status(500).json({ error: 'Server error while fetching likes' });
  }
};