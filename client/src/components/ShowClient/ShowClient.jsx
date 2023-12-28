import React, { useEffect,useState } from 'react'
import axios from 'axios'

function ShowClient() {
    const [clients,setClients]=useState([])
    const getClients= async()=>{
        const {data}=await axios.get('http://localhost:3001/clients') 
        console.log(data);
        setClients(data)
    }
    useEffect(()=>{
        if(clients.length===0)getClients();
        console.log(clients);
    },[clients])
    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Batidoras</th>
                        <th scope="col">Reductores</th>
                    </tr>
                </thead>
                {
                    clients.length>0 && 
                    clients.map((client)=>
                        <tbody>
                            <tr>
                                <th scope="row">{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.telefono}</td>
                                <td>
                                    {client.Batidoras.map((batidora, index) => (
                                        <span className='bg-info m-1' key={index}>{batidora.name}{index < client.Batidoras.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </td>
                                <td>
                                    {client.Batidoras.map((batidora, index) => (
                                        <span className='bg-info m-1' key={index}>{batidora.Reductor.name}{index < client.Batidoras.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </td>
                            </tr>
                          
                        </tbody>
                    )
                }               
            </table>
        </div>
    )
}

export default ShowClient