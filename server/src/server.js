const express= require('express')
const cors=require('cors')
const router=require('./routes')

const server=express();
server.use(express.json()) // para leer json
server.use(cors())
server.use(router)

module.exports=server