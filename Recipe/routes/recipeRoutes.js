


const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.post('/', recipeController.addRecipe);

router.get('/all', recipeController.getAllRecipes);
router.get('/search', recipeController.searchRecipes);

module.exports = router;
