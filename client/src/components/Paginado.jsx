import {useState} from 'react'
import Cards from "./Cards";

export default function Paginado({recipes,cantRecipe,refresh}){
    
    const cantPages = Math.round(recipes.length / cantRecipe);
    const [page,setPage] = useState(1)
    const lastRecipe = cantRecipe * page
    const firstRecipe = lastRecipe - cantRecipe
    let recipePerPage = recipes.slice(firstRecipe,lastRecipe)
    const numPage = []
    for(let i = 1; i <= cantPages; i++){
        numPage.push(
            <button value={i} onClick={()=>{setPage(i)}}>
                {i}
            </button>)
    }
    return(
        <div>
           {
                refresh && recipePerPage.length?
                recipePerPage.map(r=>{
                    return(
                    <Cards id={r.id} image={r.image} name={r.name} nivelSalubre={r.nivelSalubre} />)
                })
                :
                <h1>Cargando</h1>
            }
            <div>
                {numPage}
            </div>
        </div>
    )
}