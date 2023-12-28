const {Reductor} = require('../db')

const getReductores= async(req,res)=>{

    if(Reductor){
        try {
            const reductores= await Reductor.findAll()
            return reductores.length > 0 ? res.status(200).json(reductores) 
                : res.status(404).send('No existen registros de reductores')
            
        } catch (error) {
           console.log(error); 
        }
    }  
    
}

module.exports=getReductores