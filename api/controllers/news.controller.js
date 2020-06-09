const News = require("../models/news.model.js");
var fs  = require('fs')
// Create and Save a new news
exports.simpan = (req, res) => {

  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database
   
  


  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var finalImg = req.file.filename 
  // Create a news
  const news = new News({
    id_user : req.body.id_user,
    image : finalImg,
    tanggal_post : req.body.tanggal_post,
    caption : req.body.caption,
    alamat : req.body.alamat
  });

  // Save news in the database
  News.simpan(news, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the news."
      });
    else res.send(data);
  });
};

// Retrieve all newss from the database.
exports.semua = (req, res) => {
  News.semua((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving newss."
      });
    else res.send(data);
  });
};

// Find a single news with a newsId
exports.detail = (req, res) => {
  News.findById(req.params.id_news, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found news with id ${req.params.id_news}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving news with id " + req.params.id_news
        });
      }
    } else res.send(data);
  });
};

// Update a news identified by the newsId in the request
exports.ubah = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var finalImg = req.file.filename 
  // Create a news
  const news = new News({
    image : finalImg,
    tanggal_post : req.body.tanggal_post,
    caption : req.body.caption,
    alamat : req.body.alamat
  });
  

  News.updateById(
    req.params.id_news,
    new News(news),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found news with id ${req.params.id_news}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating news with id " + req.params.id_news
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a news with the specified newsId in the request
exports.hapus = (req, res) => {
  News.hapus(req.params.id_news, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found news with id ${req.params.id_news}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete news with id " + req.params.id_news
        });
      }
    } else res.send({ message: `news was deleted successfully!` });
  });
};

// Delete all newss from the database.
exports.hapusSemua = (req, res) => {
  news.hapusSemua((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all newss."
      });
    else res.send({ message: `All newss were deleted successfully!` });
  });
};