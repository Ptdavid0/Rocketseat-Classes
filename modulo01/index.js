const express = require("express");

const server = express();

server.use(express.json()); // Tornando nosso server capaz de ler json

// req -> informacoes advindas do usuario
// res -> informacoes devolvidas pelo servidor

// Query Params = ?teste=1
// Route Params = /users/1
// Request Body = {name:"Pedro" , idade: 21, humano: true}

const users = ["Pedro", "Lucas", "David"];
let ativacoes = 0;

//===============================MIDDLEWARE=====================================

//(Global)----------------------------------------------------------------------

server.use((req, res, next) => {
  console.time("Request"); // Inicio do calculo de tempo da requisicao

  ativacoes++;

  console.log(`
  === Middleware ativado ${ativacoes}x ===
  Metodo : ${req.method} & Url : ${req.url}
  `);

  next(); // Permitira que apos o middleware a aplicacao continue

  console.timeEnd("Request"); // Temino do calculo de tempo da requisicao
});

//(Local)-----------------------------------------------------------------------

function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User dont exist" });
  }

  req.user = user; // permite o uso do req.user ou inves de users[index]

  return next();
}

//==============================================================================

// Listar todos os Users--------------------------------------------------------

server.get("/users", (req, res) => {
  res.send(users);
});

// Route Params-----------------------------------------------------------------

server.get("/hello/:name", (req, res) => {
  const { name } = req.params;

  return res.send(`Hello ${name}`);
  // Caso tenha mais de um comando, o return sera usado
});

// Query Params-----------------------------------------------------------------

server.get("/test", (req, res) => {
  const { gender } = req.query;

  return res.send(`That Person is ${gender}`);
});

//=================================CRUD=========================================

// 1) Metodo de LER os Users----------------------------------------------------

server.get("/users/:index", checkUserInArray, (req, res) => {
  //   const { index } = req.params;
  //   console.log(req.user);

  return res.json(req.user);
});

// 2) Metodo de CRIAR de novos Users--------------------------------------------

server.post("/users", checkUserExist, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// 3) Metodo de EDITAR de Users-------------------------------------------------

server.put("/users/:index", checkUserInArray, checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// 4) Metodo de DELETAR Users---------------------------------------------------

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

//==============================================================================

server.listen(3000);
