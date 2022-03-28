const pg = require("pg")

const client = new pg.Client({
    user: "lector",
    password: "lector",
    database: "postgres",
    port: 5433,
    host: "pgadmin.jvh.kfs.es"
})

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
       
        client.query('SELECT NOW()', (err, res) => {
            if (err) throw err
            console.log(res.rows[0])
            client.end()
        })
    }
})