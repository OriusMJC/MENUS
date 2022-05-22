const initialState = {
    diets: [],
    recipes: [],
    recipe: {}
}

export default function rootReducer(state = initialState,action){
    switch(action.type){
        case 'GET_ALL_RECIPES':
            return {
                ...state,
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
        default: 
            return state
    }
}