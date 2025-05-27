const { Router } = require('express')
const trainingController = require('../controllers/trainingController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/trainings',  trainingController.allTraining_get) //source 
router.get('/trainings/:slug', trainingController.training_get)
router.get('/enrolled-training',  trainingController.enrolledTraining_get)

router.post('/trainings', verifyJWT, verifyAdmin, upload.single('image'), trainingController.addTraining_post)//source
router.post('/enroll-training',  trainingController.addTrainingEnrollment_post)
router.patch('/trainings/:id', verifyJWT, verifyAdmin, upload.single('image'), trainingController.updateTraining_post)
router.delete('/trainings/:id', verifyJWT, verifyAdmin, trainingController.deleteTraining_post)

module.exports = router
