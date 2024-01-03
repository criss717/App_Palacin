const express= require('express')
const cors=require('cors')
const router=require('./routes')

const server=express();
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // para q no de errores de cors
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});
server.use(express.json()) // para leer json
server.use(cors())
server.use(router)

module.exports=server