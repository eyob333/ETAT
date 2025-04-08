const { Router } = require('express')
const newsController = require('../controllers/newsController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/news',  newsController.allNews_get)
router.get('/news/:slug',  newsController.news_get)

router.post('/news-like/:id',  newsController.newsLike_post)
router.post('/news', verifyJWT, verifyAdmin, upload.single('image'), newsController.addNews_post)
router.patch('/news/:id', verifyJWT, verifyAdmin, upload.single('image'), newsController.updateNews_post)
router.delete('/news/:id', verifyJWT, verifyAdmin, newsController.deleteNews_post)

module.exports = router
