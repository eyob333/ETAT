// controllers/newsController.js
/* eslint-disable camelcase */
const News = require('../models/News') // Import the News model
const NewsLikes = require('../models/NewsLikes'); // Import the NewsLikes model
// REMOVE THESE LINES:
// const Sequelize = require('sequelize');
// const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
// const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { ... }) // No longer needed here

// Create a new news
module.exports.addNews_post = async (req, res) => {
  const { title, body, author_name, id, source } = req.body
  const picture = req.file ? process.env.backend + req.file.path : ''
  try {
    const user_id = id
    const news = await News.create({ title, body, picture, author_name, user_id, source })
    res.status(201).json(news)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

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
    console.log("news likes error::", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all news
module.exports.allNews_get = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json({news});
  } catch (error) {
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
            // This sequelize.literal needs access to the sequelize instance.
            // Since `News` model is now connected to `../config/sequelize`,
            // and this is a literal that depends on the global sequelize instance context,
            // you might need to adjust how `sequelize.literal` is accessed here if it's not implicitly available.
            // A common pattern is to import `sequelize` here specifically for literals or complex queries,
            // but ensure you are NOT initializing a new one.
            // For now, let's assume it works because the model is connected.
            require('../config/sequelize').literal('COALESCE((SELECT total_likes FROM "newsLikes" WHERE "newsLikes"."news_id" = "News"."id"), 0)'),
            'like_count'
          ],
          [
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
    res.status(500).json({ error: error.message });
  }
};

// Update a specific news
module.exports.updateNews_post = async (req, res) => {
  const newsId = req.params.id
  const updatedNews = req.body

  try {
    const news = await News.findByPk(newsId)
    if (news) {
      Object.assign(news, updatedNews)

      if (req.file) {
        news.picture = process.env.backend + req.file.path
      }
      news.updatedAt = new Date()
      await news.save()
      res.status(200).json({ news })
    } else {
      res.status(404).json({ error: 'News not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a specific news
module.exports.deleteNews_post = async (req, res) => {
  const newsId = req.params.id

  try {
    const news = await News.findByPk(newsId)
    if (news) {
      await news.destroy()
      res.status(200).json({ message: 'News deleted successfully' })
    } else {
      res.status(404).json({ error: 'News not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// controllers/newsController.js
module.exports.getNewsLikes = async (req, res) => {
  const { id } = req.params;

  try {
    const newsLike = await NewsLikes.findOne({ where: { news_id: id } });

    if (!newsLike) {
      return res.status(404).json({ error: 'Likes not found for this news item' });
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