const sql = require("./db.js");
var md5 = require('md5');
// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.level = user.level;
};

User.login = (newUser, result) => {

    var sql="SELECT * `tb_user` WHERE `email`='"+newUser.email+"' and password = '"+newUser.password+"'";             
    sql.query(sql, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found user with the id
          result({ kind: "not_found" }, null); 
    });
  };

  User.daftar = (newUser, result) => {
    sql.query("INSERT INTO tb_user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.findById = (id, result) => {
    sql.query(`SELECT * FROM tb_user WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  User.semua = result => {
    sql.query("SELECT * FROM tb_user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("user: ", res);
      result(null, res);
    });
  };
  
  User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE tb_user SET email = ?, password = ?, level = ? WHERE id = ?",
      [user.email, user.password, user.level, md5(id)],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated User: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };
  
  User.hapus = (id, result) => {
    sql.query("DELETE FROM tb_user WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  
  User.hapusSemua = result => {
    sql.query("DELETE FROM tb_user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };

  

  module.exports = User;