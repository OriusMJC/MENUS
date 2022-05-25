import {Link} from 'react-router-dom'

export default function Cards({id,image,name,nivelSalubre}){
    return(
        <div key={id}>
            <Link to={`/recipe/${id}`}>
                <img src={image} alt={name}/>
                <h2>{name}</h2>
                <p>{nivelSalubre}</p>
            </Link>
        </div>
    )
}