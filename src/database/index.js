const { Sequelize } = require("sequelize");

const DB_NAME = "gamabuster";
const DB_USER = "root";
const DB_PASS = "bls130295";
const DB_CONFIG = {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
};

let db = {};

try {
  db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
}catch(error){
 console.error("erro ao conectar com o DB ", error.message);
}

const hasConnection = async() => {
  try {
    await db.authenticate();
    console.log("banco de dados conectado")
  } catch (error) {
    console.error("erro ao autenticar coneccao com o DB ", error.message);
  }
}

Object.assign(db, { hasConnection })

module.exports = db;