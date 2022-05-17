const express = require("express");

const router = express.Router();

const HomeController = require("../controllers/home");
const GeneroController = require("../controllers/genero");
const FilmeController = require("../controllers/filme");
const ClienteController = require("../controllers/cliente");
const ReservaController = require("../controllers/reserva");

router.get("/filmes", FilmeController.index)
router.post("/filmes", FilmeController.store);
router.get("/filmes/:id", FilmeController.show);
router.put("/filmes/:id", FilmeController.update);
router.delete("/filmes/:id", FilmeController.destroy);

router.get("/clientes", ClienteController.index)
router.post("/clientes", ClienteController.store);
router.get("/clientes/:id", ClienteController.show);
router.put("/clientes/:id", ClienteController.update);
router.delete("/clientes/:id", ClienteController.destroy);

router.get("/generos", GeneroController.index)
router.post("/generos", GeneroController.store);
router.get("/generos/:id", GeneroController.show);
router.put("/generos/:id", GeneroController.update);
router.delete("/generos/:id", GeneroController.destroy);

router.get("/reservas", ReservaController.index)
router.post("/reservas", ReservaController.store);
router.get("/reservas/:id", ReservaController.show);
router.put("/reservas/:id", ReservaController.update);
router.delete("/reservas/:id", ReservaController.destroy);

router.get('/', HomeController.welcome);

module.exports = router;