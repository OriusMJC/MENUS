const axios = require('axios');
const { Router } = require('express');
const {Recipe,Diet} = require('../db')
const {API_KEY} = process.env;

const router = Router();


const getAllRecipesApi = async()=>{
    const resu = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    // console.log(resu.data.results[0].title)
    const recetas = resu.data.results.map(r=>{
        return {
            id: r.id,
            name: r.title,
            image: r.image,
            resumenDePlato: r.summary,
            puntuacion: r.weightWatcherSmartPoints,
            nivelSalubre: r.healthScore,
            pasos: r.analyzedInstructions[0] && r.analyzedInstructions[0].steps.map(p=> p.step),
            diets: r.diets
        }
    })
    return recetas
}

const getAllRecipesDb = async()=>{
    const recetas = Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['id','name'],
            through:{
                attributes: []
            },nest: true
        }
    })
    return recetas
}

const getAllRecipes = async()=>{
    const rec1 = await getAllRecipesApi()
    const rec2 = await getAllRecipesDb()
    const allRecipes = rec1.concat(rec2)
    return allRecipes;
}

router.get('/', async(req,res,next)=>{
    const {name} = req.query;
    let len = name && name.length
    try {
        const allRecipes = await getAllRecipes()
        if(name){
            const recetas = allRecipes.filter(r=> r.name.toLowerCase().includes(name.toLowerCase().slice(2,len-1)))
            if(recetas.length) return res.json(recetas)
            else return res.send(`No se ha podido encontrar una receta con el nombre ${name}`)
        }
        res.json(allRecipes)
        
    } catch (error) {
        next(error)
    }

})

router.get('/:idReceta',async(req,res,next)=>{
    const id = req.params.idReceta
    try {
        const resuApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        if(resuApi){
            const receta = {
                id: resuApi.data.id,
                name: resuApi.data.title,
                image: resuApi.data.image,
                resumenDePlato: resuApi.data.summary,
                puntuacion: resuApi.data.weightWatcherSmartPoints,
                nivelSalubre: resuApi.data.healthScore,
                pasos: resuApi.data.analyzedInstructions[0] && resuApi.data.analyzedInstructions[0].steps.map(p=> p.step),
                dietas: resuApi.data.diets
            }
            return res.json(receta)
        }
        const resuDb = Recipe.findByPk(id)
        if(resuDb){
            const dietsDb = await resuDb.getDiets().map(d=> d.dataValues.name)
            return res.json({...resuDb.dataValues, dietsDb})
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;
