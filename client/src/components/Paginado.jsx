import {useState} from 'react'
import Cards from "./Cards";
import './Style/Paginado.css'
import Loading from './Loading'

export default function Paginado({recipes,cantRecipe,refresh}){
    
    const cantPages = Math.round(recipes.length / cantRecipe);
    const [page,setPage] = useState(1)
    const lastRecipe = cantRecipe * page
    const firstRecipe = lastRecipe - cantRecipe
    let recipePerPage = recipes.slice(firstRecipe,lastRecipe)
    const numPage = []
    if(typeof recipes !== 'string'){
        for(let i = 1; i <= cantPages; i++){
            numPage.push(
                <button value={i} onClick={()=>{setPage(i)}}>
                    {i}
                </button>)
        }
    }

    if(page !== 1 && page > numPage.length){
        setPage(1)
    }

    return(
        <div className='pag-container'>
            <div className='pg-cont-butt'>
                {numPage}
            </div>
            <div className='pag-cont-cards'>
           {
                refresh && recipePerPage.length?
                typeof recipes !== 'string'?
                recipePerPage.map(r=>{
                    return(
                    <Cards id={r && r.id} image={r && r.image} name={r && r.name} nivelSalubre={r && r.nivelSalubre} />)
                })
                :
                <h2>{recipes}</h2>
                :
                <Loading/>
            }
            </div>
            <div className='pg-cont-butt'>
                {numPage}
            </div>
        </div>
    )
}