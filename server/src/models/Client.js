const {DataTypes}=require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Client',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false
        },
        telefono:{
            type:DataTypes.INTEGER,
        },       
    },{
        timestamps:false //retira los createdAt y updateAt automáticos
    })
}