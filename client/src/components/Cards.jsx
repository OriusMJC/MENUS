import {Link} from 'react-router-dom'
import './Style/Cards.css'
import imgDefault from './img/loading.png'

export default function Cards({id,image,name,nivelSalubre}){

    const styleImg = {
        backgroundImage: `url(${image? image : imgDefault})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: image? 'cover' : 'contain',
        outlineOffset: image? '-8px' : '0px'
    }

    return(
        <div key={id} className='cards-container'>
            <Link to={`/recipe/${id}`}>
                <p>Nivel salubre: {nivelSalubre}</p>
                <div className='c-c-img' style={styleImg}>
                    <div>
                        <h2>{name}</h2> 
                    </div> 
                </div>
            </Link>
        </div>
    )
}