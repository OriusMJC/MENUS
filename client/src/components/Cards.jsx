import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteRecipe } from '../actions'
import './Style/Cards.css'
import imgDefault from './img/loading.png'

export default function Cards({id,image,name,nivelSalubre}){
    const dispatch = useDispatch()

    const styleImg = {
        backgroundImage: `url(${image? image : imgDefault})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: image? 'cover' : 'contain',
        outlineOffset: image? '-8px' : '0px'
    }

    return(
        <div key={id} className='cards-container'>
            <p>Nivel salubre: {nivelSalubre}
            {
                id && id.length > 10?
                <button onClick={()=>{dispatch(deleteRecipe(id))}}>X</button>
                :
                <></>
            }
            </p>
            <Link to={`/recipe/${id}`}>
                <div className='c-c-img' style={styleImg}>
                    <div>
                        <h2>{name}</h2> 
                    </div> 
                </div>
            </Link>
        </div>
    )
}