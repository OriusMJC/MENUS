import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAllRecipes, getAllDiets, orderPerAlfa, orderPerPunt, filterByDiets} from '../actions'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import './Style/Home.css'

export default function Home(){
    const dispatch = useDispatch()
    const recipes = useSelector((store)=> store.recipes)
    const diets = useSelector((store)=> store.diets)
    const [cantRecipePage, setCantRecipePage] = useState(9)
    const [refresh, setRefresh] = useState(1)
    // const btnOpenNav = document.querySelector('#btn-open-nav')
    // const btnCloseNav = document.querySelector('#btn-close-nav')
    const nav = document.querySelector('.home-navbar-d')

    const openNav = ()=>{
        nav.classList.add('nav-activate')
    }
    const closeNav = ()=>{
        nav.classList.remove('nav-activate')
    }

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
        <div className='home-container'>
            <div className='home-nav'>
                <div className='home-navbar-up'>
                    <SearchBar/>
                    <h1>MENU'S</h1>
                    <Link to='/recipecreate'>
                        <button id='crear-receta'>
                            <h1>CREAR RECETA</h1>
                        </button>
                    </Link>
                </div>
                <button id='btn-open-nav' onClick={()=>{openNav()}}> ___ <br/> ___ <br/> ___ </button>
                <div className='home-navbar-d'>
                    <button id='btn-close-nav' onClick={()=>{closeNav()}}>X</button>
                    <Link to='/recipecreate'>
                        <button>
                            <h1>CREAR RECETA</h1>
                        </button>
                    </Link>
                    <button onClick={(e)=>{handleClick(e)}}>
                        <h1>RECARGAR TODAS LAS RECETAS</h1>
                    </button>
                    <div>
                        <label>RECETAS POR PÁGINA</label>
                        <select onChange={(e)=>{changeCantRecipePage(e)}}>
                            <option value='9'>9</option>
                            <option value='12'>12</option>
                            <option value='24'>24</option>
                            <option value='36'>36</option>
                            <option value='100'>Todas</option>
                        </select>
                    </div>
                    <div>
                        <label>TIPO DE DIETA</label>
                        <select onChange={(e)=>{filterDiet(e)}}>
                            <option value='all'>TODAS</option>
                            {
                                diets&&diets.map(d=>{
                                    return(
                                        <>
                                            <option value={d.name} >{d.name.toUpperCase()}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>ORDEN ALFABÉTICO</label>
                        <select onChange={(e)=>{ordenAlfa(e)}}>
                            <option value='defect'>POR DEFECTO</option>
                            <option value='ascen'>ASCENDENTE</option>
                            <option value='descen'>DESCENTENDE</option>
                        </select>
                    </div>
                    <div>
                        <label>ORDEN SALUBRE</label>
                        <select onChange={(e)=>{ordenPunt(e)}}>
                            <option value='defect'>POR DEFECTO</option>
                            <option value='ascen'>ASCENDENTE</option>
                            <option value='descen'>DESCENDENTE</option>
                        </select>
                    </div>
                </div>
            </div>
            <Paginado recipes={recipes} cantRecipe={cantRecipePage} refresh={refresh}/>
        </div>
        )
}