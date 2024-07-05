
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

exports.addRecipe = async (req, res) => {
  try {
    const { username, title, description, ingredients, instructions } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   // Create a new recipe associated with the user
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      user: user._id  
    });
    await newRecipe.save();

    res.status(201).json({ message: 'Recipe added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};




exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const query = req.query.query;
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { ingredients: { $regex: query, $options: 'i' } },
        { instructions: { $regex: query, $options: 'i' } },    
      ]
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};