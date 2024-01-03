import React, { useEffect,useState } from 'react'
import axios from 'axios'
import s from './ShowClients.module.css'
import 'handsontable/dist/handsontable.full.min.css'
import Handsontable from 'handsontable/base'
import {registerAllModules} from 'handsontable/registry'
registerAllModules()

import {HotTable} from '@handsontable/react'

function ShowClients() {
    const [clients,setClients]=useState([])
    const [keys,setKeys]=useState([]) //almacena los nombres de las filas

    const getClients= async()=>{
        try {
            const {data}=await axios.get('http://localhost:3001/clients')             
            setClients(data)            
        } catch (error) {
            console.log(error);
        }
    }
    const getKeys=(clients)=>{ //obtener nombres de columnas / filas
        const keys= clients.length>0?Object.keys(clients[0]) : []
        console.log(keys);
        setKeys(keys)
    }

    useEffect(()=>{
        if(clients.length===0)getClients();
        else getKeys(clients)       
    },[clients])
   
    return (
        <div>
            <table className="table table-info table-hover">
                <thead className='table-dark'>
                    <tr>
                        {
                            keys.map((keys,indice)=>{   
                                if(keys==='Batidoras') return (
                                    <>
                                        <th key={indice} scope='col'>batidoras</th>
                                        <th key={indice} scope='col'>reductores</th>
                                    </>
                                ) 
                                else return <th key={indice} scope='col'>{keys}</th>
                            })
                        }                        
                    </tr>
                </thead>
                {
                    clients.length>0 && 
                    clients.map((client)=>
                        <tbody key={client.id}>
                            <tr>
                                <th scope="row">{client.id}</th>
                                <td>{client.fullName}</td>
                                <td>{client.number}</td>
                                <td> {client.observaciones}</td>
                                <td>
                                    {client.Batidoras.map((batidora, index) => (
                                        <span onClick={()=>handlerDetail()} className={`bg-info m-1 ${s.spantable}`} key={index}>{batidora.name}{index < client.Batidoras.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </td>
                                <td>
                                    {client.Batidoras.map((batidora, index) => (
                                        <span className={`bg-info m-1 ${s.spantable}`} key={index}>{batidora.Reductor.marca}{index < client.Batidoras.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </td>
                            </tr>                                       
                        </tbody>
                    )
                }               
            </table>
            <HotTable
                data={clients}
                rowHeaders={true}
                colHeaders={true}
                height='auto'
                licenseKey='non-commercial-and-evaluation'
            />
        </div>
    )
}

export default ShowClients