const {Batidora,Reductor} = require("../db");

module.exports= async (req,res)=>{
    try {
        const {name,año,reductorId} = req.body;       
        if(!name,!año,!reductorId){
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
        await Batidora.create({  //creamos la fila
            name,
            año ,
            reductorId           
        }) 
        
        const batidoras= await Batidora.findAll(); 
        console.log(batidoras);      
        batidoras ? res.status(200).json(batidoras) 
        : res.status(404).send(`No hay batidoras en la base de datos`)
    } catch (error) {
        res.status(500).send(error.message)
    }
}