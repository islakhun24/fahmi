const Profil = require("../models/profil.model.js");

// Create and Save a new Profil
exports.simpan = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var finalImg = req.file.filename 
  // Create a Profil
  const profil = new Profil({
    email : req.body.email,
    foto_profil : finalImg,
    no_kk : req.body.no_kk,
    nik : req.body.nik,
    nama : req.body.nama,
    jenis_kelamin : req.body.jenis_kelamin,
    tempat_lahir : req.body.tempat_lahir,
    tanggal_lahir : req.body.tanggal_lahir,
    alamat : req.body.alamat,
    id_user: req.body.id_user});

  // Save Profil in the database
  Profil.simpan(profil, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profil."
      });
    else res.send(data);
  });
};

// Retrieve all Profils from the database.
exports.semua = (req, res) => {
  Profil.semua((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profils."
      });
    else res.send(data);
  });
};

// Find a single Profil with a ProfilId
exports.detail = (req, res) => {
  Profil.findById(req.params.id_profil, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profil with id ${req.params.id_profil}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Profil with id " + req.params.id_profil
        });
      }
    } else res.send(data);
  });
};

// Update a Profil identified by the ProfilId in the request
exports.ubah = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var finalImg = req.file.filename 
  // Create a Profil
  const profil = new Profil({
    email : req.body.email,
    foto_profil : finalImg,
    no_kk : req.body.no_kk,
    nik : req.body.nik,
    nama : req.body.nama,
    jenis_kelamin : req.body.jenis_kelamin,
    tempat_lahir : req.body.tempat_lahir,
    tanggal_lahir : req.body.tanggal_lahir,
    alamat : req.body.alamat,
    id_user: req.body.id_user});

  Profil.updateById(
    req.params.id_profil,
    new Profil(profil),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Profil with id ${req.params.id_profil}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Profil with id " + req.params.id_profil
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Profil with the specified ProfilId in the request
exports.hapus = (req, res) => {
  Profil.hapus(req.params.id_profil, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profil with id ${req.params.id_profil}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Profil with id " + req.params.id_profil
        });
      }
    } else res.send({ message: `Profil was deleted successfully!` });
  });
};

// Delete all Profils from the database.
exports.hapusSemua = (req, res) => {
  Profil.hapusSemua((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Profils."
      });
    else res.send({ message: `All Profils were deleted successfully!` });
  });
};