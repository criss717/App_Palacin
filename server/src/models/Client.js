const {DataTypes}=require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Client',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        fullName: {
            type:DataTypes.STRING,
            allowNull:false
        },
        number:{
            type:DataTypes.STRING,
        },  
        observaciones:{
            type:DataTypes.STRING
        }     
    },{
        timestamps:false //retira los createdAt y updateAt automáticos
    })
}