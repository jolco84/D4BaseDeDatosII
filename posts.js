const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'likeme',
    allowExitOnIdle: true
})

const agregarPosts = async (titulo, url, descripcion, likes) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
    console.log(url)
    const values = [titulo, url, descripcion, likes]
    const result = await pool.query(consulta, values)
    console.log("Posts agregado")
}

const obtenerPosts = async (destino, presupuesto) => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

const actualizarPosts = async (id) => {
    const consulta = "UPDATE posts set likes=likes+1 where id=$1"
    const values = [id]
    const {rowCount} = await pool.query(consulta, values)

    if (rowCount === 0) {
        throw { code: 404, message: "No se consiguió ningún posts con este id: "+id  }
    }
    console.log("Posts actualizado")
}

const eliminarPosts = async (id) => {

    const consulta = "delete from posts where id=$1"
    const values = [id]
    const {rowCount} = await pool.query(consulta, values)
    if (rowCount === 0) {
        throw { code: 404, message: "No se consiguió ningún posts con este id: "+id }
    }
    console.log("Posts eliminado con éxito")

}


module.exports = { agregarPosts, obtenerPosts, actualizarPosts, eliminarPosts }