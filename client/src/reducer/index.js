const initialState = {
    diets: [],
    allRecipes: [],
    recipes: [],
    recipe: {}
}

function orderMayMen(array,prop){
    let newArray = array.sort((a,b)=> {
        if(a[prop] < b[prop])return -1;
        if(a[prop] > b[prop])return 1;
        return 0
      })
      console.log(newArray[0])
    return newArray
}
function orderMenMay(array,prop){
    let newArray = array.sort((a,b)=> {
        if(a[prop] < b[prop])return 1;
        if(a[prop] > b[prop])return -1;
        return 0
      })
    console.log(newArray[0])
    return newArray
}

export default function rootReducer(state = initialState,action){
    switch(action.type){
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                allRecipes: action.payload,
                recipes: action.payload
            }
        case 'GET_ALL_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'GET_RECIPES_BY_NAME':
            return{
                ...state,
                recipes: action.payload
            }
        case 'GET_RECIPES_BY_ID':
            return{
                ...state,
                recipe: action.payload
            }
        case 'FILTER_BY_DIETS':
            let newRecipesByDiet;
            if(action.payload === 'all'){
                newRecipesByDiet = [...state.allRecipes]
            }else{
                newRecipesByDiet = state.allRecipes.filter(r=> r.diets && (r.diets.name === action.payload || r.diets.includes(action.payload)))
            }
            return{
                ...state,
                recipes: newRecipesByDiet
            }
        case 'ORDEN_PUNT':
            let newRecipesByPunt;
             if(action.payload === 'defect'){
                newRecipesByPunt = [...state.allRecipes]
            }else if(action.payload === 'descen'){
                newRecipesByPunt = orderMayMen(state.recipes,'puntuacion')
            }else{
                newRecipesByPunt = orderMenMay(state.recipes,'puntuacion')
             }
            return{
                ...state,
                recipes: newRecipesByPunt
            }
        case 'ORDEN_ALFA':
            let newRecipesByAlfa;
            if(action.payload === 'defect'){
                newRecipesByAlfa = [...state.allRecipes]
            }else if(action.payload === 'descen'){
                newRecipesByAlfa = orderMenMay(state.recipes,'name')
            }else{
                newRecipesByAlfa = orderMayMen(state.recipes,'name')
             }
            return{
                ...state,
                recipes: newRecipesByAlfa
            }
        default: 
            return state
    }
}