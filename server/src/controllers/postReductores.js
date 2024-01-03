const {Reductor} = require("../db");

module.exports= async (req,res)=>{
    try {
        const {marca,model,tipo,RPM_out,relacion,KW,tipo_brida} = req.body;       
        if(!marca,!model,!RPM_out,!relacion,!tipo,!KW,!tipo_brida){
            return res.status(403).send('Faltan datos')
        }
        // const existingActivity = await Activity.findAll({ //para validar q no se repita nombre de cliente con su
        //     where:{name},
        //     include:{
        //         model:Country,
        //         where:{
        //             id:batidoras
        //         }
        //     }
        // })          
        // if(existingActivity.length>0) {   // si existen relaciones de nombre de actividad con id de paises         
        //     const dupCountries = existingActivity.map(activity => activity.Countries.map(activity=>activity.dataValues.id)); // array de los id de los paises q tienen la actividad
        //     const dupCountriesString= dupCountries.flat(1).join(", ") // para bajar un grado de anidamiento y volver string ya que nos dan: [["COL","VEN"]]
        //     return res.status(403).send(`There is already a record of activities with the name: "${name}", for the countries with id: [${dupCountriesString}], please remove these countries from the list`)    
        // }
        // si no hay paises q contengan esta actividad, procedemos a crearla
        await Reductor.create({  //creamos la fila
            marca,
            model,
            RPM_out,
            relacion,
            tipo,
            KW,
            tipo_brida            
        }) 
        
        const reductores= await Reductor.findAll(); 
        console.log(reductores);      
        reductores ? res.status(200).json(reductores) 
        : res.status(404).send(`No hay reductores en la base de datos`)
    } catch (error) {
        res.status(500).send(error.message)
    }
}