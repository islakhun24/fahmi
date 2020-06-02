const Kas = require("../models/kas.model.js");

// Create and Save a new kas
exports.simpan = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a kas
  const kas = new Kas({
    alamat: req.body.alamat,
    jenis_kas: req.body.jenis_kas,
    tanggal_kas: req.body.tanggal_kas,
    nominal: req.body.nominal,
    deskripsi: req.body.deskripsi
  });

  // Save kas in the database
  Kas.simpan(kas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the kas."
      });
    else res.send(data);
  });
};

// Retrieve all kass from the database.
exports.semua = (req, res) => {
  Kas.semua((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving kass."
      });
    else res.send(data);
  });
};

// Find a single kas with a kasId
exports.detail = (req, res) => {
  Kas.findById(req.params.id_kas, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found kas with id ${req.params.id_kas}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving kas with id " + req.params.id_kas
        });
      }
    } else res.send(data);
  });
};

// Update a kas identified by the kasId in the request
exports.ubah = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Kas.updateById(
    req.params.id_kas,
    new Kas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found kas with id ${req.params.id_kas}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating kas with id " + req.params.id_kas
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a kas with the specified kasId in the request
exports.hapus = (req, res) => {
  Kas.hapus(req.params.id_kas, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found kas with id ${req.params.id_kas}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete kas with id " + req.params.id_kas
        });
      }
    } else res.send({ message: `kas was deleted successfully!` });
  });
};

// Delete all kass from the database.
exports.hapusSemua = (req, res) => {
  kas.hapusSemua((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all kass."
      });
    else res.send({ message: `All kass were deleted successfully!` });
  });
};