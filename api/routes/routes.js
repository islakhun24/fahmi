var multer  = require('multer')
module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const kas = require("../controllers/kas.controller.js");
    const news = require("../controllers/news.controller.js");
    const profil = require("../controllers/profil.controller.js");


    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './api/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
      }
    })
    const upload = multer({
      storage: storage,
      limits : {fileSize : 2000000}
    });

    
    // API USER
    app.post("/login", user.login);
    app.post("/daftar", user.daftar);
    app.get("/user/all", user.semua);
    app.get("/user/detail/:id_user", user.detail);
    app.get("/user/hapus/:id_user", user.hapus);
    app.post("/user/ubah/:id_user", user.ubah);
    app.get("/user/hapusAll", user.hapusSemua);

    // API KAS
    app.post("/kas", kas.simpan);
    app.get("/kas", kas.semua);
    app.get("/kas/:id_kas", kas.detail);
    app.post("/kas/ubah/:id_kas", kas.ubah);
    app.get("/kas/hapus/:id_kas", kas.hapus);
    app.get("/kas/hapusAll", kas.hapusSemua);

    //API NEWS
    app.post("/news", upload.single('file'), news.simpan);
    app.get("/news", news.semua);
    app.get("/news/:id_news", news.detail);
    app.post("/news/ubah/:id_news", news.ubah);
    app.get("/news/hapus/:id_news", news.hapus);
    app.get("/news/hapusAll", news.hapusSemua);

    //API USER PROFIl
    app.post("/profil",upload.single('file'), profil.simpan);
    app.get("/profil", profil.semua);
    app.get("/profil/:id_profil", profil.detail);
    app.post("/news/ubah/:id_profil", profil.ubah);
    app.get("/profil/hapus/:id_profil", profil.hapus);
    app.get("/profil/hapusAll", profil.hapusSemua);
  };