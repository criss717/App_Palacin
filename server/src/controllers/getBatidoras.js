const {Batidora,Reductor} = require('../db')

const getBatidoras= async(req,res)=>{

    if(Reductor && Batidora){
        try {
            const batidoras= await Batidora.findAll({                                 
                include:{ // asociación con el modelo reductor
                    model:Reductor,
                    attributes:["name"]
                }                
            })
            return batidoras.length > 0 ? res.status(200).json(batidoras) 
                : res.status(404).send('No existen registros de batidoras')
            
        } catch (error) {
           console.log(error); 
        }
    }  
    
}

module.exports=getBatidoras