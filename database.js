"use strict";
// const mysql = require("mysql");
const Sequelize = require("sequelize");
var conf = require('config');

const sequelize = new Sequelize(conf.database_name, conf.database_user, conf.database_pass, { host: conf.database_host, port: 3306});

const Word = sequelize.define("word", {
  word: Sequelize.STRING
});

class Database {
  constructor() {
  }

  static findAllWord(callback) {
    Word.sync();
    // for (var i = 0; i < 1998; i++) {
      // Word.create({ word: "スポーツ"})
      // .catch(err => {
      //   console.log("ERROR");
      //   console.log(err);
      // })
      // .then(result => {
      //   console.log(result);
      // });
    // }
    Word.findAll()
        .then(function(result) {
          // console.log(result);
          callback(result);
        });
  }

  static findWord(w, callback) {
    Word.findAll({where:["word=?",w]}).then(function(result) {
      callback(result);
    });
  }
  static findWithoutWord(w, callback) {
   Word.findAll({where:["word<>?",w]}).then(function(result) {
      callback(result);
    }); 
  }
  static insertWord (w, callback) {
     var new_word = Word.build({
        word: w
      });
     new_word.save();

  }
}

module.exports = Database;
