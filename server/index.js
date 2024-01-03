const server=require('./src/server')
const PORT=3001
const {conn,Reductor,Batidora} = require('./src/db.js');

const createTable= async(Reductor,Batidora)=>{
    const count = await Reductor.count(); // Contar la cantidad de filas en el modelo
    if (count === 0) {
        try {
            await Reductor.create({
                marca:'bonfiglioli',
                model:'63',
                RPM_out:'15',
                relacion:'20',
                KW:'0.75',
                tipo_brida:'115',
                tipo:'km'        
            })
            await Reductor.create({
                marca:'PKD',
                model:'75',
                RPM_out:'8',
                relacion:'20',
                KW:'1',
                tipo_brida:'115',
                tipo:'km'             
            })
            await Batidora.create({
                name:'H4.5 6000',
                año:'2024',
                reductorId:1                        
            })
            await Batidora.create({
                name:'H4.5 3000',
                año:'2024',
                reductorId:2                        
            })
            await Batidora.create({
                name:'H4.5 8000',
                año:'2024',
                reductorId:1                       
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}

conn.sync({ force: false }) 
    .then(createTable(Reductor,Batidora)) 
    .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))