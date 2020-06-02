const sql = require("./db.js");

// constructor
const Kas = function(kas) {
    this.alamat= kas.alamat;
    this.jenis_kas= kas.jenis_kas;
    this.tanggal_kas= kas.tanggal_kas;
    this.nominal= kas.nominal;
    this.deskripsi= kas.deskripsi;
}

 
Kas.create = (newkas, result) => {
  sql.query("INSERT INTO tb_kas SET ?", newkas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created kas: ", { id: res.insertId, ...newkas });
    result(null, { id: res.insertId, ...newkas });
  });
};

Kas.findById = (kasId, result) => {
  sql.query(`SELECT * FROM tb_kas WHERE id = ${kasId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found kas: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found kas with the id
    result({ kind: "not_found" }, null);
  });
};

kas.semua = result => {
  sql.query("SELECT * FROM tb_kas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("kass: ", res);
    result(null, res);
  });
};

kas.updateById = (id, kas, result) => {
  sql.query(
    "UPDATE tb_kas SET alamat = ?, jenis_kas = ?, tanggal_kas = ?, nominal = ?, deskripsi = ? WHERE id = ?",
    [kas.alamat, kas.jenis_kas, kas.tanggal_kas,kas.nominal, kas.deskripsi,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found kas with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated kas: ", { id: id, ...kas });
      result(null, { id: id, ...kas });
    }
  );
};

Kas.hapus = (id, result) => {
  sql.query("DELETE FROM tb_kas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found kas with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted kas with id: ", id);
    result(null, res);
  });
};

kas.hapusSemua = result => {
  sql.query("DELETE FROM tb_kas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} kass`);
    result(null, res);
  });
};

module.exports = Kas;