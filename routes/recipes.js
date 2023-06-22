var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const axios = require("axios");

router.get("/", (req, res) => res.send("im here"));

router.get("/randomrecipes", async (req, res, next) => {
  try {
    const recipe1 = await recipes_utils.getRandomRecipes();
    const recipe2 = await recipes_utils.getRandomRecipes();
    const recipe3 = await recipes_utils.getRandomRecipes();
    // console.log(recipe1)

    // Map the recipes to the desired format
    const formattedRecipe1 = formatRecipe(recipe1);
    const formattedRecipe2 = formatRecipe(recipe2);
    const formattedRecipe3 = formatRecipe(recipe3);
    // console.log(formattedRecipe1)
    // console.log(formattedRecipe2)
    // console.log(formattedRecipe3)

    res.send([formattedRecipe1, formattedRecipe2, formattedRecipe3]);
  } catch (error) {
    next(error);
  }
});

function formatRecipe(data) {
  let recipe = data.recipes[0];
  let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe;


  return {
    id: id,
    title: title,
    readyInMinutes: readyInMinutes,
    image: image,
    popularity: aggregateLikes,
    vegan: vegan,
    vegetarian: vegetarian,
    glutenFree: glutenFree,
  };
}

/////////////////////////////////////////// need to check if this works
// router.get('/search', async (req, res, next) => {
//   try {
//     let { query, cuisine, diet, intolerances, number } = req.query;
//     console.log(req.query)
//         // Set the parameters for the API request
//     let params = {
//       query: query || '', // use the query param or default to an empty string
//       cuisine: cuisine || '',
//       diet: diet || '',
//       intolerances: intolerances || '',
//       number: number || 5, // default to 5 results if not specified
//       apiKey: process.env.spooncular_apiKey
//     };
//     // Construct the URL for the Spoonacular API

//     // Send the request to the Spoonacular API
//     let response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', { params });
//     console.log(response.data)
//     // Retrieve the full details of each recipe
//     let detailedRecipes = [];
//     for(let recipe of response.data.results){
//       // console.log(recipe.id)

//       let recipeDetails = await recipes_utils.getRecipeDetails(recipe.id);
//       // console.log(recipeDetails)
// ///////////////////////////////////////////////////////////////////////////
//       detailedRecipes.push(recipeDetails);
//       // detailedRecipes.push(recipeDetails.data);
// ///////////////////////////////////////////////////////////////////////////

//     }
//     // console.log(detailedRecipes)

//     // Send the result back to the client
//     res.json(detailedRecipes);

// } catch (error) {
// next(error);
// }
// });


router.get("/info", async (req, res, next) => {
  try {
    console.log("is here is the problem ??");
    // console.log(req.body.recipeId);
    console.log(req.query.id);

    const recipe = await recipes_utils.getRecipeAllInformation(req.query.id);
    console.log("recipe info:", recipe);

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    // this for the formated recipe way
    // res.send(recipe);

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
