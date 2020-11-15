const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var PORT = process.env.PORT || 8080

app.use(bodyParser.json())

app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

const definitions = [
    {
        word: "sa-eed",
        definition: "badass mofo"
    }
]

app.get('/api/definitions/:word', (req, res) => {
    const { word } = req.params
    const def = definitions.find((definition) => definition.word == word)
    if (def) {
        res.status(200)
        console.log(def)
        res.send(def)
    } else {
        res.status(404)
        res.send({word: def.word, definition: 'definition not found'})
    }   
})

app.post('/api/definitions', (req, res) => {
    console.log("POST ROUTE REACHED")
    const def = req.body
    if (!def.word && !def.definition)
        res.status(422).send({'word':def.word, 'definition':def.definition, 
        'error':"missing both word and definition parameter"})
    else if (!def.word)
        res.status(422).send({'word':def.word, 'definition':def.definition, 
        'error':"missing the word parameter"})
    else if (!def.definition) 
        res.status(422).send({'word':def.word, 'definition':def.definition, 
        'error':"missing the definition parameter"})
    else {
        definitions.push(def)
        res.status(200).send(def)
    }
})


app.listen(PORT, () => console.log("server running on port " + PORT))
console.log("listening in on port")

