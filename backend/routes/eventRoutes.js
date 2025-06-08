const { Router } = require('express')
const eventController = require('../controllers/eventController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyAdmin = require('../middleware/verifyAdmin')
const upload = require('../middleware/fileUpload')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware


router.get('/events',  eventController.allEvent_get)//source
router.get('/events/:slug',  eventController.event_get)
router.get('/enrolled-event',  eventController.enrolledEvent_get)

router.post('/events', verifyJWT, verifyAdmin, upload.single('logo'), eventController.addEvent_post) //source
router.post('/enroll-event',  eventController.addEventEnrollment_post)
router.patch('/events/:id', verifyJWT, verifyAdmin, upload.single('logo'), eventController.updateEvent_post)
router.delete('/events/:id', verifyJWT, verifyAdmin, eventController.deleteEvent_post)

module.exports = router
