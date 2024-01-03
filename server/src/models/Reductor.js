const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Reductor', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    model:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    RPM_out:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    relacion:{
        type: DataTypes.STRING,      
    },  
    KW:{
        type: DataTypes.STRING,      
    },
    tipo_brida:{
        type: DataTypes.STRING, 
    } 
  }, {
    timestamps:false //retira los createdAt y updateAt automáticos
 });
};