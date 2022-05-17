const ReservaController = {

  index: (req, res) => {
    res.json([]);
  },

  store: (req, res) => {
    res.json(req.body)
  },

  show: (req, res) => {
    const {
      id
    } = req.params;

    res.json({
      id,
      data_reserva: "10-10-10",
      data_limite_devolucao: "10-11-10",
      total: 100.00
    });
  },

  update: (req, res) => {
    const {
      id
    } = req.params;

    res.json({
      id,
      ...(req.body || {}),
    });
  },

  destroy: (req, res) => {
    res.status(204).send("");
  },
}

module.exports = ReservaController;