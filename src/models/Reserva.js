const { DataTypes } = require("sequelize");
const db = require("../database");
const Cliente = require("./Cliente")

const Reserva = db.define("Reserva", {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_reserva: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  data_limite_devolucao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  cliente_codigo: {
    type: DataTypes.INTEGER,
    Reference: {
      model: Cliente,
      key: "codigo",
    },
    unique: true,
  },
}, {tableName: "reserva", timestamps: false,underscored: true});

module.exports = Reserva