const { Router } = require("express");
const router = Router(); // para poder usar router

//importamos los controladores
const getClients = require("../controllers/getClients.js");
const postClients=require('../controllers/postClients.js')

//matcheamos las rutas
router.get('/clients', getClients) //solicita todos los paises a la bd
router.post('/postClient', postClients) //crea un nuevo cliente en la base de datos

module.exports = router;