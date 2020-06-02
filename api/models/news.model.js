const sql = require("./db.js");

// constructor
const News = function(news) {
  this.id_user = news.id_user;
  this.image = news.image;
  this.tanggal_post = news.tanggal_post;
  this.caption = news.caption;
  this.alamat = news.alamat;
};

News.simpan = (news, result) => {
  sql.query("INSERT INTO tb_news SET ?", news, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created news: ", { id: res.insertId, ...news });
    result(null, { id: res.insertId, ...news });
  });
};

News.findById = (newsId, result) => {
  sql.query(`SELECT * FROM tb_news WHERE id = ${newsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found news: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found news with the id
    result({ kind: "not_found" }, null);
  });
};

News.semua = result => {
  sql.query("SELECT * FROM tb_news", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("newss: ", res);
    result(null, res);
  });
};

News.updateById = (id, news, result) => {
  sql.query(
    "UPDATE newss SET email = ?, name = ?, active = ? WHERE id = ?",
    [news.email, news.name, news.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found news with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated news: ", { id: id, ...news });
      result(null, { id: id, ...news });
    }
  );
};

News.hapus = (id, result) => {
  sql.query("DELETE FROM tb_news WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found news with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted news with id: ", id);
    result(null, res);
  });
};

News.hapusAll = result => {
  sql.query("DELETE FROM tb_news", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} newss`);
    result(null, res);
  });
};

module.exports = News;