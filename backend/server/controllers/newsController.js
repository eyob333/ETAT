/* eslint-disable camelcase */
const News = require('../models/News')
const Sequelize = require('sequelize');
// const User = require('../models/User')
const { HOST, USER, PORT, PASSWORD, DATABASE } = require('../db')
const NewsLikes = require('../models/NewsLikes');

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres'
})

// Create a new news
module.exports.addNews_post = async (req, res) => {
  const { title, body, author_name, id } = req.body
  const picture = req.file ? process.env.backend + req.file.path : ''
  try {
    const user_id = id
    const news = await News.create({ title, body, picture, author_name, user_id })
    res.status(201).json(news)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

module.exports.newsLike_post = async (req, res) => {
  const { id } = req.params;
  const { total_likes } = req.body

  try {
    // Check if the id exists in the newsLikes table
    const existingLike = await NewsLikes.findOne({ where: { news_id: id } });

    if (existingLike) {
      // Update the existing record
      await existingLike.update({ total_likes });
    } else {
      // Create a new record
      await NewsLikes.create({ news_id: id, total_likes });
    }

    res.status(200).json({ message: 'News like updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all news
module.exports.allNews_get = async (req, res) => {
  try {
    const news = await News.findAll({
      attributes: {
        include: [
          [
            sequelize.literal('COALESCE((SELECT total_likes FROM "newsLikes" WHERE "newsLikes"."news_id" = "News"."id"), 0)'),
            'like_count'
          ]
        ]
      }
    });
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
            sequelize.literal('COALESCE((SELECT total_likes FROM "newsLikes" WHERE "newsLikes"."news_id" = "News"."id"), 0)'),
            'like_count'
          ]
        ]
      }
    });
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json({news});
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
