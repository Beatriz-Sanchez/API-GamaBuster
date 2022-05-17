const Reserva = require("../models/Reserva")

const ReservaController = {

  index: async (req,res) => {
    const allReservas = await Reserva.findAll()
    res.json(allReservas);
  },

  store: async (req, res) => {
    const { data_reserva, data_limite_devolucao, total } = req.body;
    const novoReserva = await Reserva.create({ data_reserva, data_limite_devolucao, total })
    res.json(novoReserva)
  },

  show: async (req, res) => {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);

    if(!reserva){
      res.status(404).json({
        message: "Reserva não encontrado"});
      
    } else {
      res.json(reserva);
    }

  },

  update: async (req, res) => {
    const { id } = req.params;
    const { data_reserva, data_limite_devolucao, total } = req.body;

    const reserva = await Reserva.findByPk(id);

    if(!reserva){
      res.status(404).json({
        message: "Reserva não encontrado"}
      );
    }

    await Reserva.update({ data_reserva, data_limite_devolucao, total },{where: {codigo: id}});

    const reservaAtualizada = await Reserva.findByPk(id);

    res.json(reservaAtualizada);

  },

  destroy: async (req, res) => {
    const { id } = req.params;

    const reserva = await Reserva.findByPk(id);

    if(!reserva){
      res.status(404).json({
        message: "Reserva não encontrado"}
        );
    } else {
      await reserva.destroy();
      res.status(204).send("");
    }

    

    
  },
}

module.exports = ReservaController;