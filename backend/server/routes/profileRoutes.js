const { Router } = require('express')
const profileController = require('../controllers/profileController')
const authController = require('../controllers/authController')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload')
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/profiles/:id',   profileController.profile_get)
router.get('/profiles',   profileController.allprofile_get)

router.post('/profiles', upload.single('profilePicture'), verifyJWT, authController.signup_post)
router.patch('/profiles/:id', upload.single('profilePicture'), verifyJWT, profileController.updateProfile_post)
router.delete('/profiles/:id', verifyJWT, verifyAdmin, profileController.deleteProfile_post)

router.post('/update-password', profileController.updatePassword_post)
router.post('/forgot-password', profileController.forgotPassword_post)
router.post('/reset-password/:id/:token', profileController.resetPassword_post)

module.exports = router
