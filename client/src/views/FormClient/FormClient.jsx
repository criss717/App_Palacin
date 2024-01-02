import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import s from '../FormClient/FormClient.module.css'

function FormClient() {
    //hooks
    const [batidoras, setBatidoras] = useState([]) //mostrar opciones { value: 'batidora1', label: 'bati' },
    const [inputSelect, setInputSelect] = useState([])
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          height: '80px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start', // Puedes ajustar esto según tus necesidades
          paddingLeft: '10px', // Añadir algún relleno izquierdo
          paddingRight: '10px', // Añadir algún relleno derecho
        }),
      };
      

    //get batidoras
    const getBatidoras = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/batidoras')
            console.log(data);
            let nameBatidoras = []
            data.map((batidora) => nameBatidoras.push({ value: batidora.name, label: batidora.name }))   // guardamos los nombres en un array
            setBatidoras(nameBatidoras)

        } catch (error) {
            console.log(error);
        }
    }

    //handlers
    const handlerInputSelect = (e) => {
        setInputSelect(e)
    }

    useEffect(() => {
        getBatidoras()
    }, [])

    return (
        <div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Full Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Number</label>
            </div>
            <div className={`form-floating`}>           
                <Select                    
                    isMulti
                    name="batidoras"
                    options={batidoras.length > 0 ? batidoras : null}
                    className={`${s.divSelect} basic-multi-select`}
                    id="floatingSelect" 
                    aria-label="Floating label select example"
                    classNamePrefix="select"
                    placeholder='Select a batidora'
                    value={inputSelect}
                    onChange={(e) => handlerInputSelect(e)}
                    height={'80px'}
                    styles={customStyles}
                />
                <label htmlFor="floatingSelect">Select batidoras</label>
            </div>
          

        </div>
    )
}

export default FormClient