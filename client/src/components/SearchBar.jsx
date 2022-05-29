import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {getRecipesByName} from '../actions'
import './Style/SearchBar.css'
import s from './img/pngwing.png'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [input,setInput] = useState('')

    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipesByName(input))
        setInput('')
    }
    console.log(input)
    return(
        <div className='cont-searchbar'>
            <form onSubmit={(e)=>{handleSubmit(e)}} >
                <button type='submit'><img src={s}/></button>
                <input value={input} onChange={(e)=>{handleChange(e)}} placeholder='Busca una receta...'/>
            </form>
        </div>
    )
}