const ClienteController = {

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
      nome: "José",
      sobrenome: "da Silva",
      cpf: 123456789-10,
      data_nascimento: "10-10-10",
      telefone: 35353535,
      email: "jose@email.com"
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

module.exports = ClienteController;