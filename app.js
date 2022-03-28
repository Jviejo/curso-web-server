var express = require('express');
const fileUpload = require('express-fileupload');
const req = require('express/lib/request');
const rutas = require('./rutas')
var app = express();
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use("/rutas", rutas);

app.use((req, res, next) => {
    console.log(new Date())
    next();
})

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} [STARTED]`)

    res.on('finish', () => {
        
        console.log(`${req.method} ${req.originalUrl} [FINISHED]`)
    })

    res.on('close', () => {
        
        console.log(`${req.method} ${req.originalUrl} [CLOSED]`)
    })

    next()
})

app.get("/", function (request, response) {
    response.send("Hi there, welcome to my assignment!");
})

app.get("/ping", (request, response) => {
    response.send(new Date().toISOString());
}
)

app.get("/jsonping", (request, response) => {
    response.send({ fecha: new Date().toISOString() });
}
)

app.post("/formulario", (request, response) => {
    response.send(request.body);

})

app.get("/peticion", (request, response) => {
    response.send(request.query);
}
)

app.post("/urlencoded", (request, response) => {
    response.send({ body: request.body, q: request.query });
}
)


app.post('/upload', (req, res) => {
    console.log(req.files)
    console.log(req.files.fichero)
    let file = req.files.fichero
    req.files.fichero.forEach(element => {
        element.mv(`./files/${element.name}`, err => {
            if (err) return res.status(500).send({ message: err })

        })
    })
    return res.status(200).send({ message: 'File upload', data: req.body })
})


app.listen(5555, function () {
    console.log('listening on port 4444');
})

