require("dotenv").config();
const { Sequelize } = require("sequelize");
const reductorModel=require("./models/Reductor")
const batidoraModel=require("./models/Batidora")
const clientModel=require("./models/Client")

const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dbpalacin`, {
  logging: false, 
  native: false, 
});

reductorModel(sequelize);
batidoraModel(sequelize);
clientModel(sequelize)

const {Reductor, Batidora,Client} = sequelize.models; //desestructuramos los modelos

// Establecer la relación
Reductor.hasMany(Batidora, { foreignKey: 'reductorId' }); // Un reductor tiene muchas batidoras
Batidora.belongsTo(Reductor,{ foreignKey: 'reductorId' }) //a cada batidora le pertenece un reductor

// Aca vendrian las relaciones_Relacion varios a varios
Batidora.belongsToMany(Client, { through: 'client_batidora'});
Client.belongsToMany(Batidora, { through: 'client_batidora'}); 

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  };