import { Link } from "react-router-dom"

export default function Card({recipe}){
    console.log(recipe)
    return(
        <div>
            <Link to='/home'>
                <button>Volver al inicio</button>
            </Link>
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name}/>
            <h3>Tipo de plato: {recipe.tipoDePlato?.join(', ')}.</h3>
            <h3>Dieta/s: {recipe.diets?.join(', ')}.</h3>
            <h3>Resumen del plato:</h3>
            <p>{recipe.resumenDePlato?.replace(/<[^>]+>/g, '')}</p>
            <p>Puntuacion: {recipe.puntuacion}</p>
            <p>Nivel salubre: {recipe.nivelSalubre}</p>
            <p>Pasos para la preparación:</p>
            <ol>
                {
                    recipe.pasos?.map(p=>{
                        return(
                            <li>{p}</li>
                        )
                    })
                }
            </ol>
        </div>
    )
}