// const axios = require('axios');
const { Router } = require('express');
// const {Recipe,Diet} = require('../db')
const recipes = require('./recipes')
const recipe = require('./recipe')
const diets = require('./diets')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes',recipes)
router.use('/recipe',recipe)
router.use('/types',diets)




module.exports = router;
