import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {createRecipe, getAllDiets} from '../actions'
import {useDispatch,useSelector} from 'react-redux'

export default function CreateRecipe(){
    const allDiets = useSelector(store=> store.diets)
    const dispatch = useDispatch()
    const [indexPaso,setIndexPaso] = useState({})
    const [cantP,setCantP] = useState(1)
    const [error,setError] = useState({})
    const [inputForm,setInputForm] = useState({
        name: '',
        image: '',
        tipoDePlato: '',
        resumenDePlato: '',
        nivelSalubre: 0,
        pasos: [],
        diets: []
    })
    
    // console.log(inputForm.pasos)
    // console.log(inputForm.pasos)
    // console.log('pasitos: ',pasitos)

    useEffect(()=>{
        dispatch(getAllDiets())
    },[dispatch])

    function validate(input){
        let error = {}
        if(input.name.length > 0 && !input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)){
            error.name = 'Solo se permiten letras y sin espacios al final!'
        }else error.name = null
        if(input.image.length > 0 && !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
            error.image = 'La imagen tiene que ser un URL'
        }else error.image = null
        if(input.tipoDePlato && input.tipoDePlato.length > 30){
            error.tipoDePlato = 'Tiene que contener máximo 30 caracteres'
        }else error.tipoDePlato = null
        if(input.resumenDePlato && input.resumenDePlato.length > 150){
            error.resumenDePlato = 'Tiene que contener máximo 150 caracteres'
        }else error.resumenDePlato = null
        if(input.nivelSalubre > 100 || input.nivelSalubre < 0){
            error.nivelSalubre = 'Tiene que ser entre 0 y 100'
        }else error.nivelSalubre = null
        if(input.diets && input.diets.length === 0){
            error.diets = 'Tienes que elegir al menos una dieta'
        }else error.diets = null
        return error
    }

    function handleChange(e){
        setInputForm({
            ...inputForm,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...inputForm,
            [e.target.name] : e.target.value
        }))
    } 
    function handleSelect(e){
        setInputForm({
            ...inputForm,
            diets : [...inputForm.diets,e.target.value]
        })
        setError(validate({
            ...inputForm,
            diets : [...inputForm.diets,e.target.value]
        }))
    } 
    function deleteSelect(e,id){
        e.preventDefault();
        setInputForm({
            ...inputForm,
            diets : inputForm.diets.filter(d=> d !== id)
        })
        setError(validate({
            ...inputForm,
            diets : inputForm.diets.filter(d=> d !== id)
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(error.name === null && error.image === null && 
        error.tipoDePlato === null && error.resumenDePlato === null && 
        error.nivelSalubre === null && error.diets === null){
            dispatch(createRecipe(inputForm))
            setInputForm({
                name: '',
                image: '',
                tipoDePlato: '',
                resumenDePlato: '',
                nivelSalubre: 0,
                pasos: [],
                diets: []
            })
        }else{
            alert('Arregla los errores marcados y completa los espacios requeridos')
        }
    }
    
    function handleChangePasos(e,i){
        let pasitos2 = []
        setIndexPaso({
            ...indexPaso,
            [i] : e.target.value
        })
        for(let i=0;i<cantP-1;i++){
            pasitos2.push(indexPaso[i])
        }
        setInputForm({
            ...inputForm,
            pasos: pasitos2
        })
    } 
    function addPaso(){
        let pasitos = []
        if(cantP <=13){setIndexPaso({
            ...indexPaso,
            [cantP] : ''
        })
        for(let i=0;i<cantP;i++){
            pasitos.push(indexPaso[i])
        }
        setCantP(1+cantP)
        setInputForm({
            ...inputForm,
            pasos: pasitos
        }
        )}
    }
    return(
        <div>
            <Link to='/home'>Volver al home</Link>
            <h1>Creadno Receta!</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type='text' 
                        value={inputForm.name} 
                        name='name' 
                        onChange={(e)=>{handleChange(e)}}
                        required/>
                    {error.name&& (
                        <p>{error.name}</p>
                    )}
                </div>
                <div>
                    <label>imagen:</label>
                    <input 
                        type='text' 
                        value={inputForm.image} 
                        name='image' 
                        onChange={(e)=>{handleChange(e)}}/>
                    {error.image&& (
                        <p>{error.image}</p>
                    )}
                </div>
                <div>
                    <label>Tipo de plato:</label>
                    <input 
                        type='text' 
                        value={inputForm.tipoDePlato} 
                        name='tipoDePlato' 
                        onChange={(e)=>{handleChange(e)}}/>
                    {error.tipoDePlato&& (
                        <p>{error.tipoDePlato}</p>
                    )}
                </div>
                <div>
                    <label>Resumen del plato:</label>
                    <input 
                        type='text' 
                        value={inputForm.resumenDePlato} 
                        name='resumenDePlato' 
                        onChange={(e)=>{handleChange(e)}}/>
                    {error.resumenDePlato&& (
                        <p>{error.resumenDePlato}</p>
                    )}
                </div>
                <div>
                    <label>Nivel de saludable:</label>
                    <input 
                        type='number' 
                        value={inputForm.nivelSalubre} 
                        name='nivelSalubre' 
                        onChange={(e)=>{handleChange(e)}}/>
                    {error.nivelSalubre&& (
                        <p>{error.nivelSalubre}</p>
                    )}
                </div>
                <div>
                    <label>Pasos para la preparacion (Max 13):</label>
                    <button onClick={(e)=>{addPaso(e)}}>Añadir paso</button>
                    {
                        indexPaso && inputForm.pasos.map((p,i)=>{
                            return(
                                <input type='text' value={indexPaso[i]} name='pasos' onChange={(e)=>{handleChangePasos(e,i)}} required/>        
                            )
                        })
                    }
                </div>
                <div>
                    <label>Dietas:</label>
                    <select onChange={(e)=>{handleSelect(e)}}>
                        <option> -Selleciona al menos una- </option>
                        {
                            allDiets&&allDiets.map(d=>{
                                return(
                                    <option value={d.id}>{d.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <ul>
                    {allDiets&&allDiets.map((d)=>{
                        if(inputForm && inputForm.diets.includes(d.id) ){
                            return(
                                    
                                    <li>{d.name} <button onClick={(e)=>{deleteSelect(e,d.id)}}>X</button></li>
                            )
                        }
                        return
                    })}
                    </ul>
                </div>
                <div>
                    <button type='submit'>Crear Receta</button>
                </div>
            </form>
        </div>
    )
}