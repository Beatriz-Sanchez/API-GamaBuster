const { Cliente, Endereco, Reserva } = require("../models");

const ClienteController = {
  index: async (req, res) => {
    try {
      const allClientes = await Cliente.findAll({ include: Endereco });

      res.json(allClientes);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  store: async (req, res) => {
    const {
      nome,
      sobrenome,
      cpf,
      telefone,
      email,
      data_nascimento,
      endereco = {},
    } = req.body;

    const { logradouro, numero, bairro, cidade, estado, cep } = endereco;
    let novoCliente;

    try {
      novoCliente = await Cliente.create({
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        data_nascimento,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(400)
        .json(
          "Oops, algo deu errado. Cheque as informações enviadas e tente novamente"
        );
    }

    try {
      if (endereco !== {}) {
        try {
          const novoEndereco = await novoCliente.createEndereco({logradouro, numero, bairro, cidade, estado, cep});

          res.status(200).json({ novoCliente, novoEndereco });
        } catch (error) {
          console.error(error.message);
          res
          .status(400)
          .json(
            "Oops, algo deu errado na criacao do endereco. Cheque as informações enviadas e tente novamente"
          );
        }
      } else{
        res.status(200).json(novoCliente);
      }

      
      
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json(
          "Oops, algo deu errado. Tente novamente"
        );
    }
  },
  show: async (req, res) => {
    const { id } = req.params;

    try {
      const cliente = await Cliente.findByPk(id, { include: [{ all: true }] });

      if (cliente) {
        return res.json(cliente);
      }

      res.status(404).json({
        message: "Cliente não encontrado",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        data_nascimento,
        endereco = {},
      } = req.body;

      const { logradouro, numero, bairro, cidade, estado, cep } = endereco;

      const cliente = await Cliente.findByPk(id, { include: Endereco });

      if (!cliente) {
        res.status(404).json({
          message: "Cliente não encontrado",
        });
      }

      await Cliente.update(
        { nome, sobrenome, cpf, telefone, email, data_nascimento },
        { where: { codigo: id } }
      );

      if (cliente.Endereco?.codigo) {
        await Endereco.update(
          { logradouro, numero, bairro, cidade, estado, cep },
          { where: { codigo: cliente.Endereco.codigo } }
        );
      } else {
        await cliente.createEndereco({logradouro, numero, bairro, cidade, estado, cep});
      }

      const clienteAtualizado = await Cliente.findByPk(id, {
        include: Endereco,
      });

      res.json(clienteAtualizado);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params;

    try {
      const cliente = await Cliente.findByPk(id);
      const endereco = await cliente.getEndereco();

      if (!cliente) {
        res.status(404).json({
          message: "Cliente não encontrado",
        });
      }
      await endereco.destroy();
      await cliente.destroy();

      res.status(204).send("");
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
};

module.exports = ClienteController;
