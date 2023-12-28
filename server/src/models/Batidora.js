const {DataTypes}=require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Batidora',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false
        },
        año:{
            type:DataTypes.INTEGER,
        },       
    },{
        timestamps:false //retira los createdAt y updateAt automáticos
    })
}