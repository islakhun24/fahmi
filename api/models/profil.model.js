const sql = require("./db.js");

// constructor
const profil = function(Profil) {
  this.id_user = Profil.id_user;
  this.image = Profil.image;
  this.tanggal_post = Profil.tanggal_post;
  this.caption = Profil.caption;
  this.alamat = Profil.alamat;
};

Profil.simpan = (profil, result) => {
  sql.query("INSERT INTO tb_user_profil SET ?", Profil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Profil: ", { id: res.insertId, ...Profil });
    result(null, { id: res.insertId, ...Profil });
  });
};

Profil.findById = (ProfilId, result) => {
  sql.query(`SELECT * FROM tb_user_profil WHERE id = ${ProfilId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Profil: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Profil with the id
    result({ kind: "not_found" }, null);
  });
};

Profil.semua = result => {
  sql.query("SELECT * FROM tb_user_profil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Profils: ", res);
    result(null, res);
  });
};

Profil.updateById = (id, profil, result) => {
  sql.query(
    "UPDATE tb_user_profil SET email = ?, name = ?, active = ? WHERE id = ?",
    [Profil.email, Profil.name, Profil.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Profil with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Profil: ", { id: id, ...profil });
      result(null, { id: id, ...profil });
    }
  );
};

Profil.hapus = (id, result) => {
  sql.query("DELETE FROM tb_user_profil WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Profil with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Profil with id: ", id);
    result(null, res);
  });
};

Profil.hapusAll = result => {
  sql.query("DELETE FROM tb_user_profil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Profils`);
    result(null, res);
  });
};

module.exports = Profil;