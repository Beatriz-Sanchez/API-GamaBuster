const Cliente = require('../models/Cliente')

const ClienteController = {

  index: async (req,res) => {
    const allClientes = await Cliente.findAll()
    res.json(allClientes);
  },

  store: async (req, res) => {
    const { nome, sobrenome, cpf, data_nascimento, telefone, email } = req.body;
    const novoCliente = await Cliente.create({ nome, sobrenome, cpf, data_nascimento, telefone, email })
    res.json(novoCliente)
  },

  show: async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if(cliente){
      res.json(cliente);
    } else {
      res.status(404).json("Cliente não encontrado");
    }

  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, cpf, data_nascimento, telefone, email } = req.body;

    const cliente = await Cliente.findByPk(id);

    if(!cliente){
      res.status(404).json({
        message: "Cliente não encontrado"}
      );
    }

    await Cliente.update({ nome, sobrenome, cpf, data_nascimento, telefone, email },{where: {codigo: id}});

    const clienteAtualizado = await Cliente.findByPk(id);

    res.json(clienteAtualizado);

  },

  destroy: async (req, res) => {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if(!cliente){
      res.status(404).json({
        message: "Cliente não encontrado"}
        );
    }

    await cliente.destroy();

    res.status(204).send("");
  },
}

module.exports = ClienteController;