const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const router = express.Router()
const Task = require('../models/Task')

// Get all Tasks
router.get("/", (req, res) => {
  Task.find({}, (err, foundTasks) => {
    if (!err) {
      res.status(200).json(foundTasks)
    } else {
      res.status(400).json(err)
    }
  })
})

// table route
router.get('/table', (req, res) => {
    Task.find({}, (err, foundTasks) => {
      if (!err) {
        const formattedData = foundTasks.reduce((acc, item) => {
          acc[item.status] = acc[item.status] ? [...acc[item.status], item] : [item]
          return acc
        }, {})
        res.status(200).json(formattedData)
      } else {
        res.status(400).json(err)
      }
    })
  })



// Create
router.post('/', (req, res) => {
  const { body } = req
  
  Task.create(body, (err, createdTask) => {
    if (!err) {
      res.status(200).json({message: "All Good!", createdTask: createdTask})
    } else {
      res.status(400).json(err)
    }
  })
})


// Update
router.put('/:id', (req, res) => {
    const { body } = req
  
    Task.findByIdAndUpdate(req.params.id, body,{new: true}, (err, updatedTask) => {
      if (!err) {
        res.status(200).json(updatedTask)
      } else {
        res.status(400).json(err)
      }
    })
  
  })



// Delete 
router.delete("/:id", (req, res) => {
    Task.findByIdAndDelete(req.params.id, (err) => {
      if (!err) {
        res.status(200).json({message: "Deleted that task, yessiirrr"})
      } else {
        res.status(400).json(err)
      }
    })
  })
  
  
  
  
  
  
  // Show
  router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, foundTask) => {
      if (!err) {
        res.status(200).json(foundTask)
      } else {
        res.status(400).json(err)
      }
    })
  })




module.exports = router