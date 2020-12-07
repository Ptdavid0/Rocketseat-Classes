//Concluido 07/02/2020

const express = require("express");

const server = express();

server.use(express.json());

let used = 0;

server.use((req, res, next) => {
  used++;
  console.log(used);
  next();
});

function checkIfIdExist(req, res, next) {
  const { id } = req.params;

  console.log(projects.length);

  for (let x = 0; x < projects.length; x++) {
    if (projects[x].id == id) {
      return next();
    }
  }
  return res.status(400).json({ massege: "This Id do not exist" });
}

const projects = [
  {
    id: 0,
    title: "New Rules",
    tasks: ["Phone", "Let he in", "kiss"]
  },
  {
    id: 1,
    title: "IDGAF",
    tasks: ["I dont", "Give a", "Fiuk"]
  }
];

server.post("/projects", (req, res) => {
  const { id, title, task } = req.body;

  projects.push({ id, title, task });

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkIfIdExist, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  console.log(title, id);

  for (let x = 0; x < projects.length; x++) {
    if (projects[x].id == id) {
      projects[x].tasks.push(title);
    }
  }
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.put("/projects/:id", checkIfIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //   console.log(projects.id);

  for (let x = 0; x < projects.length; x++) {
    if (projects[x].id == id) {
      projects[x].title = title;
    }
  }

  return res.json(projects);
});

server.delete("/projects/:id", checkIfIdExist, (req, res) => {
  const { id } = req.params;

  for (let x = 0; x < projects.length; x++) {
    if (projects[x].id == id) {
      projects.splice(projects[x], 1);
      console.log("We got it");
    }
  }

  return res.json(projects);
});

server.listen(3001);

// O codigo abaixo insere os dados sem o formato de Objeto

// server.post("/project", (req, res) => {
//   const { id, title } = req.body;

//   projects.push(id, title);

//   return res.json(projects);
// });
