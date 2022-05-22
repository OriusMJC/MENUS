// const axios = require('axios');
const { Router } = require('express');
const {Recipe,Diet} = require('../db')

const router = Router();

// const apiKey= '2cec9b9be9144bf9ae5eaa163c98fa14'


router.post('/',async(req,res,next)=>{
    const {name,image,resumenDePlato,puntuacion,nivelSalubre,pasos,diets} = req.body;
    try {
        await Recipe.create({name,image,resumenDePlato,puntuacion,nivelSalubre,pasos})
        if(diets.length){
            const newReci = await Recipe.findOne({where: {name}});
            diets.forEach(async d=>{
                await newReci.addDiet(d)
            })
        }
        res.send('Receta creada')
    } catch (error) {
        next(error)
    }
})

module.exports = router;
