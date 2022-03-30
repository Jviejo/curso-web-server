const { Pool, Client } = require('pg')

require('dotenv').config()

const pool = new Pool()

const q = async (q, parametros) => {
    const client = await pool.connect()
    const res = await client.query(q, parametros)
    await client.release()
    return res.rows
}

module.exports = {
    q
}