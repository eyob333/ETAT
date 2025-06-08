const { Router } = require('express')
const contactController = require('../controllers/contactController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/contacts', contactController.contact_get)

router.post('/contacts', verifyJWT, verifyAdmin, contactController.addContact_post)
router.patch('/contacts', verifyJWT, verifyAdmin, contactController.updateContact_post)

router.post('/contact-us', contactController.contactUs_post)

module.exports = router
