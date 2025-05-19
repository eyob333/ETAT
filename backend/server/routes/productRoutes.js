const { Router } = require('express')
const productController = require('../controllers/productController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/products', productController.allProducts_get)
router.get('/products/category/:category', productController.productsByCategory_get)
router.get('/products/:id', productController.product_get)

router.post('/products', verifyJWT, verifyAdmin, upload.single('image'), productController.addProduct_post)
router.patch('/products/:id', verifyJWT, verifyAdmin, upload.single('image'), productController.updateProduct_post)
router.delete('/products/:id', verifyJWT, verifyAdmin, productController.deleteProduct_post)

module.exports = router
