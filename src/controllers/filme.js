const Filme = require("../models/Filme")

const FilmeController = {

  index: async (req,res) => {
    const allFilmes = await Filme.findAll()
    res.json(allFilmes);
  },

  store: async (req, res) => {
    const { nome, ano_lancamento, duracao, estoque } = req.body;
    const novoFilme = await Filme.create({ nome,ano_lancamento, duracao, estoque })
    res.json(novoFilme)
  },

  show: async (req, res) => {
    const { id } = req.params;
    const filme = await Filme.findByPk(id);

    if(filme){
      res.json(filme);
    } else {
      res.status(404).json("Filme não encontrado");
    }

  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, ano_lancamento, duracao, estoque } = req.body;

    const filme = await Filme.findByPk(id);

    if(!filme){
      res.status(404).json({
        message: "Filme não encontrado"}
      );
    }

    await Filme.update({ nome, ano_lancamento, duracao, estoque },{where: {codigo: id}});

    const filmeAtualizado = await Filme.findByPk(id);

    res.json(filmeAtualizado);

  },

  destroy: async (req, res) => {
    const { id } = req.params;

    const filme = await Filme.findByPk(id);

    if(!filme){
      res.status(404).json({
        message: "Filme não encontrado"}
        );
    }

    await filme.destroy();

    res.status(204).send("");
  },
}

module.exports = FilmeController;