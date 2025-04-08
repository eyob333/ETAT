const { Router } = require('express')
const projectController = require('../controllers/projectController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyAdmin = require('../middleware/verifyAdmin')
const upload = require('../middleware/fileUpload')
const apicache = require('apicache')

const router = Router()

// Init cache
const cache = apicache.middleware

router.get('/projects',  projectController.allProject_get)
router.get('/projects/:id',  projectController.project_get)

router.post('/projects', verifyJWT, verifyAdmin, upload.fields([{
           name: 'image', maxCount: 1
         }, {
           name: 'doc', maxCount: 1
         }]),  projectController.addProject_post)
router.patch('/projects/:id', verifyJWT, verifyAdmin, upload.fields([{
           name: 'image', maxCount: 1
         }, {
           name: 'doc', maxCount: 1
         }]),  projectController.updateProject_post)
router.delete('/projects/:id', verifyJWT, verifyAdmin, projectController.deleteProject_post)

module.exports = router
