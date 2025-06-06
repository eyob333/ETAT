const { Testimonial } = require('../models/Testimonial'); // Adjust path if necessary
const { apicache } = require('apicache'); // For clearing cache after CUD operations

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const allTestimonials_get = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
const testimonial_get = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }

        res.status(200).json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Add new testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
const addTestimonial_post = async (req, res) => {
    const { name, testimony } = req.body;
    let imagePath = null;

    // Check if an image was uploaded
    if (req.file) {
        // Assuming req.file.path or req.file.location (if using S3) holds the image URL/path
        imagePath = req.file.path || `/uploads/${req.file.filename}`; // Adjust as per your file storage
    }

    try {
        const newTestimonial = await Testimonial.create({
            name,
            testimony,
            image: imagePath // Save the image path/URL
        });

        // Clear cache for testimonials after a new one is added
        // apicache.clear('/api/testimonials');
        console.log("some path")

        res.status(201).json({
            success: true,
            data: newTestimonial
        });
    } catch (error) {
        console.error("foo testimonial erorr::",error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ success: false, errors: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update testimonial
// @route   PATCH /api/testimonials/:id
// @access  Private (Admin)
const updateTestimonial_post = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }

        const { name, testimony } = req.body;
        let imagePath = testimonial.image; // Keep existing image by default

        // Check if a new image was uploaded
        if (req.file) {
            imagePath = req.file.path || `/uploads/${req.file.filename}`; // Adjust as per your file storage
            // TODO: Optionally, delete the old image file from storage if it exists
        }

        await testimonial.update({
            name: name || testimonial.name,
            testimony: testimony || testimonial.testimony,
            image: imagePath
        });

        // Clear cache for testimonials after an update
        apicache.clear('/api/testimonials');
        apicache.clear(`/api/testimonials/${req.params.id}`);


        res.status(200).json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ success: false, errors: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
const deleteTestimonial_post = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }

        // TODO: Optionally, delete the associated image file from storage

        await testimonial.destroy();

        // Clear cache for testimonials after a deletion
        apicache.clear('/api/testimonials');
        apicache.clear(`/api/testimonials/${req.params.id}`);

        res.status(200).json({
            success: true,
            data: {} // Return empty object for successful deletion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    allTestimonials_get,
    testimonial_get,
    addTestimonial_post,
    updateTestimonial_post,
    deleteTestimonial_post
};
