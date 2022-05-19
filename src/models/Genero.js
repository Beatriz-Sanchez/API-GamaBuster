const { DataTypes } = require("sequelize");
const db = require("../database");

const Genero = db.define("genero", {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {tableName: "genero", timestamps: false, underscored: true});

module.exports = Genero