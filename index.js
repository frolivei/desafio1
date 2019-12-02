const express = require('express');

const server = express();

server.use(express.json());

const projects = [ { id: "1", title: "projeto inicial", tasks: [] } ];

// lista todos projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// inclui novo projeto
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  
  projects.push({ id:`${id}`, title: `${title}`, tasks:[] });

  return res.json(projects);
});

// altera um projeto
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map((project) => {
    if (project.id == id)
      project.title = title;
  })

  return res.json(projects);
});

// remove um projeto
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((project) => {
    return project.id == id;
  });

  if (index >= 0)
    projects.splice(index, 1);

  res.send();
});

// inclui uma tarefa no projeto
server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex((project) => {
    return project.id == id;
  });

  if (index >= 0)
    projects[index].tasks.push(`${title}`);

  return res.json(projects);
});

server.listen(3000);