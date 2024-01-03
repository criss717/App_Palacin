import React, { useEffect, useState } from 'react'
import axios from 'axios'
import s from '../FormBatidora/FormBatidora.module.css'

function FormBatidora() {
    //hooks
    const [reductores, setReductores] = useState([])
    const [dataForm, setDataForm] = useState({    //guardará los inputs del usuario
        name: '',
        año: '',
        reductorId: '',
    })
    const [noValidate, setNoValidate] = useState(false) //para validar el form con bootstrap    

    //get reductores
    const getreductores = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/reductores')
            console.log(data);
            setReductores(data)
        } catch (error) {
            console.log(error);
        }
    }
    //post batidora
    const createBatidora = async (batidora) => {
        try {
            const { data } = await axios.post('http://localhost:3001/postBatidora', batidora)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    //handlers
    const handlerInputForm = (e) => {      
        const { name, value } = e.target                
        setDataForm({
            ...dataForm,
            [name]: value
        })        
    }
    const handlerSubmitForm = (e) => {
        e.preventDefault()        
        createBatidora({
            ...dataForm,
            año:Number(dataForm.año),
            reductorId: reductores.find((reductor)=>reductor.marca===dataForm.reductorId).id// para enviar solamente los id
        })
        e.target.reset() //limpiamos el form
        setDataForm({ // limpiamos el input select 
            ...dataForm,
            reductorId: ''
        })
    }

    useEffect(() => {
        getreductores();
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
        <form className={`${s.divFormBatidora} bg-info form-control needs-validation`} onSubmit={(e) => handlerSubmitForm(e)} noValidate>
            <h1 className='fw-bolder mb-4'><span className="badge text-bg-secondary fw-bolder p-2">Crea una nueva BATIDORA</span></h1>
            <div className='row g-2 mt-5 mb-3'>
                <div className="form-floating col-md-8">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="floatingInput" name='name' required />
                    <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating col-md">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="floatingNumber" name='año' required />
                    <label htmlFor="floatingNumber">Age</label>
                </div>
            </div>
            <div className={`form-floating mb-3`}>               
                <select onChange={(e) => handlerInputForm(e)} className="form-select" value={dataForm.reductorId} name='reductorId' id="floatingSelect" aria-label="Floating label select example" required>  
                    <option selected disabled value="">Choose...</option>                  
                    {
                        reductores.length>0 && reductores.map((reductor)=><option key={reductor.id}>{reductor.marca}</option>)
                    }                    
                </select>

                <div className="invalid-feedback text-end" style={{ fontWeight: "bold" }}>Required field</div>
                <label htmlFor="floatingSelect">Select a reductor</label>
            </div>
            <div className="form-floating mb-5">
                <textarea onChange={(e) => handlerInputForm(e)} className="form-control" id="floatingPassword" name='observaciones' style={{ height: "100px" }}></textarea>
                <label htmlFor="floatingPassword">Observaciones</label>
            </div>
            <button className='btn btn-primary fw-bolder' type='submit'>Create new batidora</button>

        </form>
    )
}

export default FormBatidora