import Card from "./Card";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById } from "../actions";

export default function RecipeDetails(){
    let {idRecipe} = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(store => store.recipe);
    useEffect(()=>{
        dispatch(getRecipesById(idRecipe))
    },[dispatch,idRecipe])
    return(
        <div>
            {
                recipe? 
                <Card recipe={recipe}/>
                :
                <h1>Cargando</h1>
            }
        </div>
    )
}