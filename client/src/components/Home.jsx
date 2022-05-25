import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAllRecipes, getAllDiets, orderPerAlfa, orderPerPunt, filterByDiets} from '../actions'
import Paginado from './Paginado'

export default function Home(){
    const dispatch = useDispatch()
    // const allRecipes = useSelector((store)=> store.allRecipes)
    const recipes = useSelector((store)=> store.recipes)
    const diets = useSelector((store)=> store.diets)
    const [cantRecipePage, setCantRecipePage] = useState(9)
    const [refresh, setRefresh] = useState(1)
    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getAllDiets())
    },[dispatch])
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllRecipes())
    }
    
    function filterDiet(e){
        e.preventDefault();
        dispatch(filterByDiets(e.target.value))
    }
    function ordenAlfa(e){
        e.preventDefault();
        setRefresh(refresh + 1)
        dispatch(orderPerAlfa(e.target.value))
    }
    function ordenPunt(e){
        e.preventDefault();
        setRefresh(refresh + 1)
        dispatch(orderPerPunt(e.target.value))
    }
    function changeCantRecipePage(e){
        e.preventDefault();
        setCantRecipePage(Number(e.target.value))
    }
    return(
        <div>
            <h1>PI-FOOD</h1>
            <Link to='/recipecreate'>PI-FOOD</Link>
            <button onClick={(e)=>{handleClick(e)}}>
                Recargar las recetas.
            </button>
            <label>Por tipo de dieta</label>
            <select onChange={(e)=>{filterDiet(e)}}>
                <option value='all'>Todas</option>
                {
                    diets&&diets.map(d=>{
                        return(
                            <>
                                <option value={d.name} >{d.name}</option>
                            </>
                        )
                    })
                }
            </select>
            <label>Por orden alfabético</label>
            <select onChange={(e)=>{ordenAlfa(e)}}>
                <option value='defect'>Por defecto</option>
                <option value='ascen'>Ascendente</option>
                <option value='descen'>Descendente</option>
            </select>
            <label>Orden por nivel salubre</label>
            <select onChange={(e)=>{ordenPunt(e)}}>
                <option value='defect'>Por defecto</option>
                <option value='ascen'>Ascendente</option>
                <option value='descen'>Descendente</option>
            </select>
            <label>Recetas por página</label>
            <select onChange={(e)=>{changeCantRecipePage(e)}}>
                <option value='9'>9</option>
                <option value='12'>12</option>
                <option value='24'>24</option>
                <option value='36'>36</option>
                <option value='100'>Todas</option>
            </select>
            <Paginado recipes={recipes} cantRecipe={cantRecipePage} refresh={refresh}/>
        </div>
        )
}