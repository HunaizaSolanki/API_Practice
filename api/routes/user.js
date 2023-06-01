const express = require("express");
const mongoose = require("mongoose");

// create router
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
        age: req.body.age,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        userType: req.body.userType,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            new_user: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          msg: "User not found",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            msg: "Password not matched",
          });
        }
        if (result) {
          const created_token = jwt.sign(
            {
              name: user[0].name,
              email: user[0].email,
              userType: user[0].userType,
              phoneNumber: user[0].phoneNumber,
            },
            "Testing", 
            // {
            //     expiresIn: '24h'
            // }
          );
          res.status(200).json({
            name: user[0].name,
            userType: user[0].userType,
            email: user[0].email,
            phoneNumber: user[0].phoneNumber,
            token: created_token
          })
        }
      });
    })
    .catch(err => {
        res.status(500).json({
            msg: "Error"
        })
    })
});

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Ok",
  });
});

module.exports = router;
