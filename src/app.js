const express = require('express');

const routes = require("./routes");
const app = express();
const port = 3000;
const db = require("./database")

db.hasConnection();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes);

app.listen(port, ()=>{
  console.log(`Servidor executando na porta: ${port}`);
});