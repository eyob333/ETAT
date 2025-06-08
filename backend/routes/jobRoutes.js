const { Router } = require('express')
const jobController = require('../controllers/jobController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/jobs',  jobController.allJob_get)
router.get('/jobs/:slug',  jobController.job_get)

router.post('/jobs', verifyJWT, verifyAdmin, upload.single('image'), jobController.addJob_post)
router.patch('/jobs/:id', verifyJWT, verifyAdmin, upload.single('image'), jobController.updateJob_post)
router.delete('/jobs/:id', verifyJWT, verifyAdmin, jobController.deleteJob_post)

module.exports = router
