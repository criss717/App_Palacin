import React, { useEffect,useState } from 'react'
import axios from 'axios'

function ShowReductores() {
    const [reductores,setReductores]=useState([])
    const [keys,setKeys]=useState([]) //almacena los nombres de las filas


    const getreductores= async()=>{
        const {data}=await axios.get('http://localhost:3001/reductores') 
        console.log(data);
        setReductores(data)
    }
    const getKeys=(reductores)=>{ //obtener nomber de columnas / filas
        const keys= reductores.length>0?Object.keys(reductores[0]) : []
        console.log(keys);
        setKeys(keys)
    }

    useEffect(()=>{
        if(reductores.length===0)getreductores();
        else getKeys(reductores)
        console.table(reductores);
    },[reductores])
    
    return (
        <div className='mt-5 col-12 col-md-10 col-xl-8'>
            <table className="table table-info table-hover">
                <thead className='table-dark'>
                    <tr>
                        {
                            keys.map((keys,indice)=>{                                   
                                return <th key={indice} scope='col'>{keys}</th>
                            })
                        }  
                    </tr>
                </thead>
                {
                    reductores.length>0 && 
                    reductores.map((reductor)=>
                        <tbody key={reductor.id}>
                            <tr>
                                <th scope="row">{reductor.id}</th>
                                <td>{reductor.marca}</td>
                                <td>{reductor.tipo}</td> 
                                <td>{reductor.model}</td>
                                <td>{reductor.RPM_out}</td>
                                <td>{reductor.relacion}</td>  
                                <td>{reductor.KW}</td> 
                                <td>{reductor.tipo_brida}</td>                               
                            </tr>                          
                        </tbody>
                    )
                }               
            </table>          
        </div>
    )
}

export default ShowReductores