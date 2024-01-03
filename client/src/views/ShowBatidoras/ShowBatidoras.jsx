import React, { useEffect,useState } from 'react'
import axios from 'axios'
import s from './ShowBatidoras.module.css'

function ShowBatidoras() {
    const [batidoras,setBatidoras]=useState([])
    const [keys,setKeys]=useState([]) //almacena los nombres de las filas

    const getBatidoras= async()=>{
        try {
            const {data}=await axios.get('http://localhost:3001/batidoras') 
            console.log(data);
            setBatidoras(data)        
            
        } catch (error) {
            console.log(error);
        }
    }
    const getKeys=(Batidoras)=>{ //obtener nomber de columnas / filas
        const keys= Batidoras.length>0?Object.keys(Batidoras[0]) : []
        console.log(keys);
        setKeys(keys)
    }

    useEffect(()=>{
        if(batidoras.length===0)getBatidoras();
        else getKeys(batidoras)
        console.table(batidoras);
    },[batidoras])
    
    return (
        <div>
            <table className="table table-info table-hover">
                <thead className='table-dark'>
                    <tr>
                        {
                            keys.map((keys,indice)=>{   
                                if(keys==='Reductor') return (
                                    <th key={indice} scope='col'>reductor</th>                          
                                ) 
                                else if(keys!=='reductorId') return <th key={indice} scope='col'>{keys}</th>
                            })
                        }  
                    </tr>
                </thead>
                {
                    batidoras.length>0 && 
                    batidoras.map((batidora)=>
                        <tbody key={batidora.id}>
                            <tr>
                                <th scope="row">{batidora.id}</th>
                                <td>{batidora.name}</td>
                                <td>{batidora.año}</td>
                                <td><span className={`bg-info m-1 ${s.spantable}`} >{batidora.Reductor.marca}</span></td>                               
                            </tr>
                          
                        </tbody>
                    )
                }               
            </table>          
        </div>
    )
}

export default ShowBatidoras