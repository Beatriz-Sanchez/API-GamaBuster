const {
  Reserva,
  Cliente,
  ReservaFilme
} = require('../models')

const ReservaController = {

  index: async (req, res) => {
    try {
      const allReservas = await Reserva.findAll({
        include: Cliente
      })
      res.json(allReservas);
    }catch(error){
      console.log(error);
      res.status(500).json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },

  store: async (req, res) => {
    const {
      data_reserva,
      data_limite_devolucao,
      total, 
      cliente_codigo,
      filmes //array. Dentro vai ter: objeto com codigo e quantidade
    } = req.body;
     const novaReserva = await Reserva.create({ data_reserva, data_limite_devolucao, total, cliente_codigo })

     //tentando adicionar reserva_filme
      for (i = 0; i < filmes.length; i++){
        const filme = filmes[i]
        await ReservaFilme.create({
          quantidade: filme.quantidade,
          filme_codigo: filme.codigo,
          reserva_codigo: novaReserva.codigo
        })
      }

    const novaReservaCompleta = await Reserva.findByPk(novaReserva.codigo, {include: [{
      all: true
    }, ],})


    res.json(novaReservaCompleta)
  },

  show: async (req, res) => {
    const {
      id
    } = req.params;
    const reserva = await Reserva.findByPk(id, {
      include: [{
        all: true
      }, ],
    });

    if (!reserva) {
      res.status(404).json({
        message: "Reserva não encontrado"
      });

    } else {
      res.json(reserva);
    }

  },

  update: async (req, res) => {
    const {
      id
    } = req.params;
    const {
      data_reserva,
      data_limite_devolucao,
      total
    } = req.body;

    const reserva = await Reserva.findByPk(id);

    if (!reserva) {
      res.status(404).json({
        message: "Reserva não encontrado"
      });
    }

    await Reserva.update({
      data_reserva,
      data_limite_devolucao,
      total
    }, {
      where: {
        codigo: id
      }
    });

    const reservaAtualizada = await Reserva.findByPk(id, { include: [{all: true}] });

    res.json(reservaAtualizada);

  },

  destroy: async (req, res) => {
    const {
      id
    } = req.params;

    const reserva = await Reserva.findByPk(id);

    if (!reserva) {
      res.status(404).json({
        message: "Reserva não encontrado"
      });
    } else {
      await reserva.destroy();
      res.status(204).send("");
    }




  },
}

module.exports = ReservaController;