const { Router } = require('express')
const partnerController = require('../controllers/partnerController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyAdmin = require('../middleware/verifyAdmin')
const upload = require('../middleware/fileUpload')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/partners',  partnerController.allPartner_get)
router.get('/partners/:id',  partnerController.partner_get)

router.post('/partners', verifyJWT, verifyAdmin, upload.single('logo'), partnerController.addPartner_post)
router.patch('/partners/:id', verifyJWT, verifyAdmin, upload.single('logo'), partnerController.updatePartner_post)
router.delete('/partners/:id', verifyJWT, verifyAdmin, partnerController.deletePartner_post)

module.exports = router
