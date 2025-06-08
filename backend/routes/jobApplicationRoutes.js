const { Router } = require('express')
const jobApplicationController = require('../controllers/jobApplicationController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/jobApplications', jobApplicationController.allJobApplication_get)
router.get('/jobApplications/:job_id', jobApplicationController.jobApplication_get)
router.post('/jobApplications/:job_id', upload.single('resume'), jobApplicationController.addJobApplication_post)

module.exports = router
