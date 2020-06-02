

const User = require("../models/user.model.js");
var md5 = require('md5');


exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      email: req.body.email,
      password: md5(req.body.password),
    });
  
    
    // Save User in the database
    User.login(user  , (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
  };

  exports.daftar = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
        email: req.body.email,
        password: md5(req.body.password),
        level: req.body.level
      });
  
    // Save User in the database
    User.daftar(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      else res.send(data);
    });
  };
  
  exports.semua = (req, res) => {
    User.semua((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      else res.send(data);
    });
  };

  exports.detail = (req, res) => {
    User.findById(req.params.id_user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id_user}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.id_user
          });
        }
      } else res.send(data);
    });
  };
  
  // Update a User identified by the id in the request
  exports.ubah = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    User.updateById(
      req.params.id_user,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id_user}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.id_user
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete a User with the specified id in the request
  exports.hapus = (req, res) => {
    User.remove(req.params.id_user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id_user}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id_user
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };
  
  // Delete all User from the database.
  exports.hapusSemua = (req, res) => {
    User.hapusSemua((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all User."
        });
      else res.send({ message: `All User were deleted successfully!` });
    });
  };