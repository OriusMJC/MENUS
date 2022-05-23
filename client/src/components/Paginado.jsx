import {useState} from 'react'
import Card from "./Card";

export default function Paginado({recipes,cantRecipe}){
    
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
                recipePerPage.length?
                recipePerPage.map(r=>{
                    return(
                    <Card id={r.id} image={r.image} name={r.name} puntuacion={r.puntuacion} />)
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