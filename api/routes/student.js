const express = require("express");
const mongoose = require("mongoose");

// create router
const router = express.Router();
const Student = require("../model/student");
const checkAuth = require('../middleware/check-auth')

router.get("/", checkAuth, (req, res, next) => {
  // res.status(200).json({
  //     msg: 'Get Request'
  // })
  Student.find()
    .then((result) => {
      res.status(200).json({
        studentData: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//Get Data by ID
router.get("/:id", (req, res, next) => {
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        student: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  // res.status(200).json({
  //     msg: 'Post Request'
  // })

  // console.log(req.body)

  //To show data in postman also in mongodb atlas
  const student = new Student({
    _id: new mongoose.Types.ObjectId(), //Generate new ID
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    email: req.body.email,
  });

  student
    .save()
    .then((result) => {
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Student.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Record Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Student.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
      },
    },
    { new: true } // Add this option to return the updated document
  )
    .then((result) => {
      res.status(200).json({
        updated: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
