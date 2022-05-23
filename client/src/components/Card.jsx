import {Link, link} from 'react-router-dom'

export default function Card({id,image,name,puntuacion}){
    return(
        <div key={id}>
            <Link to={`/recipe/${id}`}>
                <img src={image}/>
                <h2>{name}</h2>
                <p>{puntuacion}</p>
            </Link>
        </div>
    )
}