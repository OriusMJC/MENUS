const axios = require('axios');
const { Router } = require('express');
const {Recipe,Diet} = require('../db')
const {API_KEY} = process.env;

const router = Router();


const getAllRecipesApi = async()=>{
    const resu = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=2cec9b9be9144bf9ae5eaa163c98fa14&addRecipeInformation=true&number=100`);
    // console.log(resu.data.results[0].title)
    const recetas = resu.data.results.map(r=>{
        return {
            id: r.id,
            name: r.title,
            image: r.image,
            nivelSalubre: r.healthScore,
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
            }
        }
    })
    return recetas
}

const getAllRecipes = async()=>{
    const rec1 = await getAllRecipesApi()
    const rec2 = await getAllRecipesDb()
    const allRecipes = rec2.concat(rec1)
    return allRecipes;
}

router.get('/', async(req,res,next)=>{
    const {name} = req.query;
    try {
        const allRecipes = await getAllRecipes()
        if(name){
            const recetas = allRecipes.filter(r=> r.name.toLowerCase().includes(name.toLowerCase()))
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
        if(id.length < 15){
            const resuApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=2cec9b9be9144bf9ae5eaa163c98fa14`)
            if(resuApi){
                const receta = {
                    id: resuApi.data.id,
                    name: resuApi.data.title,
                    image: resuApi.data.image,
                    tipoDePlato: resuApi.data.dishTypes,
                    resumenDePlato: resuApi.data.summary,
                    nivelSalubre: resuApi.data.healthScore,
                    pasos: resuApi.data.analyzedInstructions[0] && resuApi.data.analyzedInstructions[0].steps.map(p=> p.step),
                    diets: resuApi.data.diets
                }
                return res.json(receta)
            }
        }
        let resuDb = await Recipe.findByPk(id)
        if(resuDb){
            let dietsDb = await resuDb.getDiets()
            let diets = dietsDb.map(d=> d.dataValues.name)
            return res.json({...resuDb.dataValues, diets})
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;
