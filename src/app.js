const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

class repository {
  constructor(title, url, techs) {
    this.id = uuid();
    this.title = title;
    this.url = url;
    this.techs = techs;
    this.likes = 0;
  }
}

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  if (!title) {
    return response.status(422).json({ error: `campo ${title} não enviado` });
  }
  if (!url) {
    return response.status(422).json({ error: `campo ${url} não enviado` });
  }
  if (!techs) {
    return response.status(422).json({ error: `campo ${techs} não enviado` });
  }

  const newRepositorie = new repository(title, url, techs);
  repositories.push(newRepositorie);

  return response.json(newRepositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  if (index < 0) {
    response.status(400).json({ error: "repositório não encontrado" });
  }

  repositories[index] = { ...repositories[index], title, url, techs };

  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
