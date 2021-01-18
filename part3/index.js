const express = require('express');
const { v4: uuidv4 } = require('uuid');
var morgan = require('morgan') 
var cors = require('cors');
const app = express();

app.use(morgan('tiny')) // 打印日志
app.use(express.json()); // 解析 req 的 body
app.use(cors()); // 允许跨域

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id === id)
  
  if(!!note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
 
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if(!body.content) {
    res.status(400).json({
      error: 'content missing'
    })

    return;
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: uuidv4(),
  };

  notes = notes.concat(note);

  res.json(note);
});

const unkonwnEndpoint = (req, res, next) => {
  res.status(404).send('api 404');
}

app.use(unkonwnEndpoint);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
