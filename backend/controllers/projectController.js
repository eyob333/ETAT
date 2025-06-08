/* eslint-disable camelcase */
const Project = require('../models/Project')

// Create a new sevice
module.exports.addProject_post = async (req, res) => {
  const { title, body, area, start_date, end_date, status, id } = req.body
  const picture = req.files && req.files.image ? process.env.backend + req.files.image[0].path : ''
  const doc = req.files && req.files.doc ? process.env.backend + req.files.doc[0].path : ''
  try {
    const user_id = id
    
    try {
      const project = await Project.create({ title, body, area, start_date, end_date, status, user_id, doc, picture })
      
      res.status(201).json(project)
    } catch (error) {
      console.log("foo messed up project", error)
      res.status(500).json({ error: error.message })
    }
    
  } catch (error) {
    console.log("project error", error)
    res.status(500).json({ error: error.message })
  }
}

// get all sevices
module.exports.allProject_get = async (req, res) => {
  try {
    const projects = await Project.findAll()
    res.status(200).json({ projects })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific project by ID
module.exports.project_get = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Project.findByPk(id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.status(200).json({ project })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific project
module.exports.updateProject_post = async (req, res) => {
  const projectId = req.params.id;
  const updatedProject = req.body;

  try {
    const project = await Project.findByPk(projectId);
    if (project) {
      if (req.files) {
        if (req.files.image) {
          project.picture = process.env.backend + req.files.image[0].path;
        }
        if (req.files.doc) {
          project.doc = process.env.backend + req.files.doc[0].path;
        }
      }
      Object.assign(project, updatedProject);

      project.updatedAt = new Date();
      await project.save();
      res.status(200).json({ project });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific project
module.exports.deleteProject_post = async (req, res) => {
  const projectId = req.params.id

  try {
    const project = await Project.findByPk(projectId)
    if (project) {
      await project.destroy()
      res.status(200).json({ message: 'Project deleted successfully' })
    } else {
      res.status(404).json({ error: 'Project not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
