const express = require('express');
const cors = require('cors');
const app = express();
const { agregarPosts, obtenerPosts, actualizarPosts, eliminarPosts } = require('./posts')


app.listen(3000, console.log("El servidor se encuentra escuchando en el puerto 3000"))

app.use(express.json())
app.use(cors());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/posts', async (req, res) => {

    try {
        const posts = await obtenerPosts()
        res.json(posts);
    } catch (error) {
        res.status(500).send(error)
    }
});

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        if (validarRequest(titulo,url,descripcion) != 1){
            const likes = 0;
            await agregarPosts(titulo, url, descripcion, likes)
    
            res.send("Posts agregado con éxito")
        }else{
            res.status(500).send("Request Vacio")
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id" + id)
        await actualizarPosts(id)

        res.send("Posts actualizado con éxito")
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id" + id)
        await eliminarPosts(id)

        res.send("Posts actualizado con éxito")
    } catch ({ code, message }) {
        res.status(code).send(message)
    }
})

const validarRequest = (titulo, url, descripcion) =>{
    if (titulo==="" || titulo=== null){
        console.log("vacio titulo")
        return 1
    }
    if (url==="" || url=== null){
        console.log("vacio url")
        return 1
    }
    if (descripcion==="" || descripcion=== null){
        console.log("vacio descripcion")
        return 1
    }

}