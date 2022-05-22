// const axios = require('axios');
const { Router } = require('express');
const {Diet} = require('../db')
// const {API_KEY} = process.env;
const router = Router();


router.get('/',async(req,res,next)=>{
    try {
        const allDietas = await Diet.findAll()
        if(!allDietas.length){
            const newDiets = [
                "gluten free",
                "dairy free",          
                "ketogenic",           
                "lacto ovo vegetarian",
                "vegan",               
                "pescatarian",         
                "paleolithic",         
                "primal",              
                "fodmap friendly",     
                "whole 30"
            ]
            const dietsPms = newDiets.map(d=>{
                return Diet.create({name:d})
            })
            await Promise.all(dietsPms)
            const allDietsDb = await Diet.findAll()
            return res.json(allDietsDb)
        }
        res.json(allDietas)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
