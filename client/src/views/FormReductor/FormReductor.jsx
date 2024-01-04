import React, { useEffect, useState } from 'react'
import axios from 'axios'
import s from '../FormReductor/FormReductor.module.css'

function FormReductor() {
    //hooks   
    const [dataForm, setDataForm] = useState({    //guardará los inputs del usuario
        marca: '',
        model: '',
        relacion: '',
        RPM_out: '',
        tipo: '',
        KW: '',
        tipo_brida: ''
    })
    const [noValidate, setNoValidate] = useState(false) //para validar el form con bootstrap    

    //post reductor
    const createReductor = async (reductor) => {
        try {
            const { data } = await axios.post('http://localhost:3001/postReductor', reductor)
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
        createReductor(dataForm)
        e.target.reset() //limpiamos el form  
        setDataForm({ // limpiamos el iinput select 
            ...dataForm,
            marca: '',
            tipo:''
        })           
    }

    useEffect(() => {       
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
        <form className={`${s.divFormReductor} bg-info form-control needs-validation mt-5`} onSubmit={(e) => handlerSubmitForm(e)} noValidate>
            <h1 className='fw-bolder mb-4'><span className="badge text-bg-secondary fw-bolder p-2">Crea un nuevo Reductor</span></h1>
            <div className='row g-2 mt-5 mb-3'>
                <div className="form-floating col-md">
                    <select onChange={(e) => handlerInputForm(e)} className="form-select" value={dataForm.marca} name='marca' id="selectMarca" aria-label="Floating label select example" required>
                        <option selected disabled value="">Choose...</option>
                        <option value="Bonfiglioli">Bonfiglioli</option>
                        <option value="PGR">PGR</option>
                        <option value="Cidepa">Cidepa</option>
                        <option value="Pato">Pato</option>
                    </select>
                    <div className="invalid-feedback text-end" style={{ fontWeight: "bold" }}>Required field</div>
                    <label htmlFor="selectMarca">Select a Marca</label>
                </div>
                <div className="form-floating col-md">
                    <select onChange={(e) => handlerInputForm(e)} className="form-select" value={dataForm.tipo} name='tipo' id="selectTipo" aria-label="Floating label select example" required>
                        <option selected disabled value="">Choose...</option>
                        <option value="A">A</option>
                        <option value="C">C</option>
                        <option value="F">F</option>
                        <option value="S">S</option>
                        <option value="VF">VF</option>
                        <option value="W">W</option>
                    </select>
                    <div className="invalid-feedback text-end" style={{ fontWeight: "bold" }}>Required field</div>
                    <label htmlFor="selectTipo">Select a Tipo</label>
                </div>
                <div className="form-floating col-md">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="modelo" name='model' required />
                    <label htmlFor="modelo">Modelo</label>
                </div>
            </div>
            <div className="row g-2 mb-3">
                <div className="form-floating col-md">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="relacion" name='relacion' required />
                    <label htmlFor="relacion">Relacion</label>
                </div>
                <div className="form-floating col-md">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="rpm" name='RPM_out' required />
                    <label htmlFor="rpm">RPM_out</label>
                </div>
                <div className="form-floating col-md">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="kw" name='KW' required />
                    <label htmlFor="kw">KW</label>
                </div>
            </div>
            <div className="row g-2 mb-5">
                <div className="form-floating col-md">
                    <input onChange={(e) => handlerInputForm(e)} type="text" className="form-control" id="tipoBrida" name='tipo_brida' required />
                    <label htmlFor="tipoBrida">tipo_brida</label>
                </div>
                <div className="form-floating col-md-8">
                    <textarea onChange={(e) => handlerInputForm(e)} className="form-control" id="observaciones" name='observaciones' style={{ height: "100px" }}></textarea>
                    <label htmlFor="observaciones">Observaciones</label>
                </div>

            </div>
            <button className='btn btn-primary fw-bolder' type='submit'>Create new reductor</button>
        </form>
    )
}

export default FormReductor