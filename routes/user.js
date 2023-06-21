var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  console.log(req.user_id)
  console.log(req.session.user_id)
  // console.log(req)


  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});







/**
 * This path gets body with recipeId and save this recipe in the family list of the logged-in user
 */
router.post('/familyrecepies', async (req,res,next) => {
  try{
    // console.log(req)
    const user_id = req.session.user_id;
    const username = req.body.username;
    const recipe_id = req.body.recipeId;
    const title = req.body.title;
    const image = req.body.image;
    const how_to_make = req.body.how_to_make;
    const time_to_make = req.body.time_to_make;
    const likes = req.body.likes;
    const is_vegan = req.body.is_vegan;
    const is_gluten_free = req.body.is_gluten_free;
    const servings = req.body.servings;
    await user_utils.markAsFamilyRecipes(user_id, username, recipe_id,title, image,how_to_make,time_to_make,likes,is_vegan,is_gluten_free, servings);
    res.status(200).send("The Recipe successfully saved as my recipes");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the family recipes that were saved by the logged-in user
 */
router.get('/familyrecepies', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFamilyRecipes(user_id);
    console.log(recipes_id)
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesFamilyPreview(recipes_id_array);
    console.log(results)
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});







/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/myrecepies', async (req,res,next) => {
  try{
    console.log("noaaaaaaaaaaaaaaaaaaa")
    console.log(req.session.user_id)
    console.log(req.body.username)
    console.log(req.body.title)
    console.log(req.body.image)
    console.log(JSON.stringify(req.body.ingredients))
    console.log(JSON.stringify(req.body.timeToMake))
    console.log(req.body.likes)
    console.log(req.body.isVegan)
    console.log(req.body.isGlutenFree)
    console.log(req.body.servingSize)
    console.log(req.body.instructions)
    console.log(req.body.analyzedInstructions)

    console.log("noaaaaaaaaaaaaaaaaaaa")

    const user_id = req.session.user_id;
    const username = req.body.username;
    // const recipe_id = req.body.recipeId;
    const title = req.body.title;
    const image = req.body.image;
    const how_to_make = JSON.stringify(req.body.ingredients);
    const time_to_make = req.body.timeToMake;
    const likes = req.body.likes;
    const is_vegan = req.body.isVegan;
    const is_gluten_free = req.body.isGlutenFree;
    const servings = req.body.servingSize;
    const instructions = req.body.instructions;
    const analyzedInstructions = JSON.stringify(req.body.analyzedInstructions);

    await user_utils.markAsMyRecipes(user_id, username, title, image ,how_to_make,time_to_make,likes,is_vegan,is_gluten_free, servings,instructions,analyzedInstructions);
    res.status(200).send("The Recipe successfully saved as my recipes");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/myrecepies', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    console.log("myrecepiesmyrecepiesmyrecepiesmyrecepiesmyrecepiesmyrecepiesmyrecepiesmyrecepies")

    console.log(user_id)
    const recipes_id = await user_utils.getMyRecipes(user_id);
    console.log(recipes_id)

    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    console.log(results)

    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});


/**
 * This path gets body with recipeId and save this recipe in the lastWatch list of the logged-in user
 */
router.post('/lastwatch', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    console.log("user_id",user_id)
    console.log("recipe_id::::::::::::::::::::::",recipe_id)
    await user_utils.markAsObserved(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as LastWatch");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the 3 last watched recpies recipes that were saved by the logged-in user
 */
router.get('/lastwatch', async (req,res,next) => {
  try{
    console.log("11")
    const user_id = req.session.user_id;
    let lastwatch_recipes = {};
    const recipes_id = await user_utils.getThreeLastRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error);  
  }
});




/**
 * This path returns the observed list that the logged-in user wached
 */
router.get('/allobserved', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let lastwatch_recipes = {};
    const recipes_id = await user_utils.getObserved(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){ 
    next(error);  
  }
});

module.exports = router;
