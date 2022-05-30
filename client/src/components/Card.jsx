import { useState } from "react"
import { Link } from "react-router-dom"
import './Style/Card.css'
import imgDefault from './img/loading.png'

export default function Card({recipe}){
    const [btn,setBtn] = useState(0)
    const styleImg = {
        backgroundImage: `url(${recipe.image? recipe.image : imgDefault})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: recipe.image? 'cover' : 'contain',
        outlineOffset: recipe.image? '-8px' : '0px'
    }

    return(
        <div className="card-container">
            <div className="card-nav">
                <div className="card-nav-button">
                    <Link to='/home'>
                        <button>
                            <h1>VOLVER AL MENÚ</h1>
                        </button>
                    </Link>
                </div>
                <div className="card-nav-title">
                    <h1>{recipe.name}</h1>
                </div>
            </div>
            <div className="card-line-data">
                <p>Nivel salubre: {recipe.nivelSalubre}</p>
                <p>Tipo de plato: {recipe.tipoDePlato}</p>
                <p>Dieta/s: {recipe.diets?.join(', ')}.</p>
            </div>
            <div className="card-cont-img-data">
                <div className="card-img" style={styleImg}>
                </div>
                <div className="card-cont-data">
                    <h3>{btn? 'PASOS PARA LA PREPARACIÓN':'RESUMEN DEL PLATO'}</h3>
                    <div className="cont-data-rp">
                    {
                        btn? 
                        <ol>
                            {
                                recipe.pasos.length? recipe.pasos.map(p=>{
                                    return(
                                        <li>{p}</li>
                                        )
                                    })
                                :
                                <p>No se han agregado pasos para esta receta.</p>
                            }
                        </ol>
                        :
                        <p>{
                            recipe.resumenDePlato? 
                            recipe.resumenDePlato.replace(/<[^>]+>/g, '')
                            :
                            <p>No se ha agregado un resumen para esta receta</p>
                        }</p>
                    }
                    </div>
                    <div id='cont-btn-data'>
                        <button id='btn-data' onClick={()=>{setBtn(1-btn)}}>
                            {btn?'VER RESUMEN': 'VER PREPARACIÓN'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}