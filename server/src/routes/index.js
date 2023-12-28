const { Router } = require("express");
const router = Router(); // para poder usar router

//importamos los controladores
const getClients = require("../controllers/getClients.js");
const postClients=require('../controllers/postClients.js')
const getBatidoras=require("../controllers/getBatidoras.js")
const postBatidoras=require("../controllers/postBatidoras.js")
const getReductores=require("../controllers/getReductores.js")
const postReductores=require("../controllers/postReductores.js")

//matcheamos las rutas
router.get('/clients', getClients) //solicita todos los clientes a la bd
router.post('/postClient', postClients) //crea un nuevo cliente en la base de datos
router.get('/batidoras', getBatidoras) //solicita todas las batidoras a la bd
router.post('/postBatidora', postBatidoras) //crea un nuevo batidora en la base de datos
router.get('/reductores', getReductores) // solicita todas las reductores a la bd
router.post('/postReductor', postReductores) //crea un nuevo reductor en la base de datos

module.exports = router;