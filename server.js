const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.use(express.json())

app.get('/musicians',async (request,response) =>{
    let data = await Musician.findAll();
    response.send(JSON.stringify(data));
})

app.get('/musicians/:id',async (request,response) =>{
    const musician = await Musician.findByPk(request.params.id);
    response.send(musician);
})

app.post('/musicians',async (request,response) =>{
    Musician.create(request.body)
    let data = await Musician.findAll();
    response.send(JSON.stringify(data));
})

app.put('/musicians/:id',async (request,response) =>{
    const musician = await Musician.findByPk(request.params.id);
    musician.update(request.body)
    let data = await Musician.findAll();
    response.send(JSON.stringify(data));
})

app.delete('/musicians/:id',async (request,response) =>{
    Musician.destroy({where:{id:(request.params.id)}})
    let data = await Musician.findAll();
    response.send(JSON.stringify(data));
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})