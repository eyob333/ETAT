const { Router } = require('express')
const testimonialController = require('../controllers/testimonialController') // Make sure to create this controller
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/fileUpload') // Only include if testimonials will have images
const verifyAdmin = require('../middleware/verifyAdmin')
const apicache = require('apicache')

const router = Router()

// Init cache (optional, depending on whether you want to cache testimonials)
const cache = apicache.middleware

// Public routes for testimonials
router.get('/testimonials', cache('2 minutes'), testimonialController.allTestimonials_get) // Cached for public viewing
router.get('/testimonials/:id', cache('2 minutes'), testimonialController.testimonial_get) // Cached for public viewing

// Admin-only routes for managing testimonials
router.post('/testimonials', verifyJWT, verifyAdmin, upload.single('image'), testimonialController.addTestimonial_post) // Requires admin and optional image upload
router.delete('/testimonials/:id', verifyJWT, verifyAdmin, testimonialController.deleteTestimonial_post) // Requires admin

module.exports = router