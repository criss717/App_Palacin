const {Client} = require("../db");

module.exports= async (req,res)=>{
    try {
        const {name,telefono,batidoras} = req.body;       
        if(!name,!telefono,!batidoras){
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
        const newClient = await Client.create({ 
            name,
            telefono            
        }) 
        newClient.addBatidoras(batidoras)
        const clientes= await Client.findAll(); 
        console.log(clientes);      
        clientes ? res.status(200).json(clientes) 
        : res.status(404).send(`No hay clientes en la base de datos`)
    } catch (error) {
        res.status(500).send(error.message)
    }
}