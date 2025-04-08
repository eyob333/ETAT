const { Router } = require('express')
const serviceController = require('../controllers/serviceController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/services',  serviceController.allService_get)
router.get('/services/:id',  serviceController.service_get)

router.post('/services', verifyJWT, verifyAdmin, upload.single('image'), serviceController.addService_post)
router.patch('/services/:id', verifyJWT, verifyAdmin, upload.single('image'), serviceController.updateService_post)
router.delete('/services/:id', verifyJWT, verifyAdmin, serviceController.deleteService_post)

module.exports = router
