import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import s from '../FormClient/FormClient.module.css'

function FormClient() {
    //hooks
    const [batidoras, setBatidoras] = useState([]) //mostrar opciones { value: 'batidora1', label: 'bati' },
    const [dataForm, setDataForm] = useState({    //guardará los inputs del usuario
        fullName: '',
        number: '',
        batidoras: [],
        observaciones: ''
    })

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            // Estilos para el contenedor principal antes de desplegar la lista del select           
            height: '80px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            border: 'none',
            outline: state.isFocused && 'none',
            borderColor: 'none',
            boxShadow: 'none',
            ':hover': {
                boxShadow: 'none'
            },
        }),
    };

    //get batidoras
    const getBatidoras = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/batidoras')
            console.log(data);
            let nameBatidoras = []
            data.map((batidora) => nameBatidoras.push({ value: batidora.id, label: batidora.name }))   // guardamos los nombres en un array
            setBatidoras(nameBatidoras)

        } catch (error) {
            console.log(error);
        }
    }
    //post client
    const createClient = async (client) => {
        try {
            const { data } = await axios.post('http://localhost:3001/postClient', client)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    //handlers
    const handlerInputForm = (e) => {
        if (e.target) { //porque el select no tiene target
            const { name, value } = e.target
            setDataForm({
                ...dataForm,
                [name]: value
            })
        } else {
            setDataForm({
                ...dataForm,
                batidoras: e
            })
        }
    }
    const handlerSubmitForm = (e) => {
        e.preventDefault()
        createClient({
            ...dataForm,
            batidoras: dataForm.batidoras.map((batidora) => batidora.value) // para enviar solamente los id
        })
        e.target.reset() //limpiamos el form
        setDataForm({ // limpiamos el iinput select multi
            ...dataForm,
            batidoras:[]
        })
    }

    useEffect(() => {
        getBatidoras()
    }, [])

    return (
        <form className='' onSubmit={(e) => handlerSubmitForm(e)}>
            <div className="form-floating mb-3">
                <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="floatingInput" name='fullName' />
                <label htmlFor="floatingInput">Full Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="floatingPassword" name='number' />
                <label htmlFor="floatingPassword">Number</label>
            </div>
            <div className={`form-floating form-control mb-3`}>
                <Select
                    isMulti
                    name="batidoras"
                    options={batidoras.length > 0 ? batidoras : null}
                    className={`basic-multi-select`}
                    id="floatingSelect"
                    classNamePrefix="select"
                    value={dataForm.batidoras}
                    onChange={(e) => handlerInputForm(e)}
                    height={'800px'}
                    styles={customStyles}
                />
                <label htmlFor="floatingSelect">Select batidoras</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="floatingPassword" name='observaciones' />
                <label htmlFor="floatingPassword">Observaciones</label>
            </div>
            <button className='btn btn-dark' type='submit'>Create new client</button>

        </form>
    )
}

export default FormClient