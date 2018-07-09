var router = require('express').Router()
var CalItems = require('../models/calitem')

//GET ALL
router.get('/api/cal/:id', (req, res, next) => {
  CalItems.find({UserId: req.params.id})
  .then(cal => {
    res.send(cal)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})



//EDIT
  router.put('/api/cal/:id',   (req,res)=>{
    CalItems.findByIdAndUpdate(req.params.id, req.body)
    .then(function (cal) {
      res.send(cal)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
  })


// CREATE NEW
router.post('/api/cal/', (req, res) => {
  CalItems.create(req.body)
  .then(newCal => {
    res.send(newCal)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//DELETE
router.delete('/api/cal/:id', (req, res) => {
  CalItems.findByIdAndRemove(req.params.id)
  .then(() => {
    res.send("Deleted!")
  })
  .catch(err => {
    res.status(400).send(err)
  })
  
})

module.exports = {
  router
}