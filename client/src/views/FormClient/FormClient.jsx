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
    const [noValidate,setNoValidate]=useState(false) //para validar el form con bootstrap

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
            batidoras: []
        })
    }

    useEffect(() => {
        getBatidoras();
        (function () { //codigo para validar form bootrap 5   
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                            setNoValidate(true) // establecemos en true si hay alguna invalidada
                        }
                        form.classList.add('was-validated')
                    }, false)
                })
        })()
    }, [])

    return (
        <form className={`${s.divForm} bg-info form-control needs-validation mt-5 d-flex align-content-center flex-column`} onSubmit={(e) => handlerSubmitForm(e)} noValidate>
            <h1 className='align-self-start fw-bolder mb-4'><span className="badge text-bg-secondary fw-bolder p-2   ">Crea un nuevo CLIENTE</span></h1>
            <div className='row g-2 mt-5 mb-3'>
                <div className="form-floating col-md-8">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="floatingInput" name='fullName' required />
                    <label htmlFor="floatingInput">Full Name</label>
                </div>
                <div className="form-floating col-md">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="floatingNumber" name='number' required/>
                    <label htmlFor="floatingNumber">Number</label>
                </div>

            </div>
            <div className={`form-floating form-control mb-3`}>
                <input value={dataForm && dataForm.batidoras} type="text" className='d-none' required /> {/*la oculto para aprovechar el validate*/}
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
                <div className="invalid-feedback text-end" style={{ fontWeight: "bold" }}>Required file</div>
                <label htmlFor="floatingSelect">Select batidoras</label>
            </div>
            <div className="form-floating mb-5">
                <textarea onChange={(e) => handlerInputForm(e)} className="form-control" id="floatingPassword" name='observaciones' style={{ height: "100px" }}></textarea>
                <label htmlFor="floatingPassword">Observaciones</label>
            </div>
            <button className='align-self-center btn btn-primary fw-bolder' type='submit'>Create new client</button>

        </form>
    )
}

export default FormClient