const {Client,Batidora,Reductor} = require('../db')

const getClients= async(req,res)=>{

    if(Client && Batidora){
        try {
            const clientes= await Client.findAll({
                include:{
                    model:Batidora, // asociacion con el modelo actividad
                    attributes:["name","reductorId"], //solo mostrar el atributo name, para q no me llene de info
                    through:{ // de la tabla intermedia
                        attributes:[] // para q no muestre nada
                    },
                    include:{
                        model:Reductor,
                        attributes:["name"]
                    }
                } 
            })
            return clientes.length > 0 ? res.status(200).json(clientes) 
                : res.status(404).send('No existen registros de clientes')
            
        } catch (error) {
           console.log(error); 
        }
    }  
    
}



module.exports=getClients