
const { DateTime } = require("mssql");
const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into favoriterecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function markAsMyRecipes(user_id, username, title, image, how_to_make, time_to_make, likes, is_vegan, is_gluten_free, servings,instructions,analyzedInstructions){
    // await DButils.execQuery(`insert into myrecipes values ('${user_id}','${username}','${title}','${image}','${how_to_make}','${time_to_make}','${likes}','${is_vegan}','${is_gluten_free}','${servings}')`);
    await DButils.execQuery(
        `INSERT INTO myrecipes (user_id, username, title, image, how_to_make, time_to_make, likes, is_vegan, is_gluten_free, servings,instructions,analyzedInstructions) VALUES ('${user_id}','${username}','${title}','${image}','${how_to_make}','${time_to_make}','${likes}','${is_vegan}','${is_gluten_free}','${servings}','${instructions}','${analyzedInstructions}')`
        );
}

async function getMyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from myrecipes where user_id='${user_id}'`);
    return recipes_id;
}


async function markAsObserved(user_id, recipe_id) {  
    // Insert the new recipe into the table
    // Check if the user and recipe combination already exists in the table
    const checkQuery = `SELECT * FROM thelastthreerecipes WHERE user_id='${user_id}' AND id='${recipe_id}'`;
    const checkResult = await DButils.execQuery(checkQuery);
    console.log("markAsObservedmarkAsObservedmarkAsObservedmarkAsObserved", checkResult)
    if (checkResult.length > 0) {
        
        // If the combination exists, update the date
        const updateQuery = `UPDATE thelastthreerecipes SET date=NOW() WHERE user_id='${user_id}' AND id='${recipe_id}'`;
        // console.log(updateQuery)
        await DButils.execQuery(updateQuery);
    }
    
    else{
        console.log("markAsObservedmarkAsObservedmarkAsObservedmarkAsObserved", checkResult.length)

        const result = await DButils.execQuery(
            `INSERT INTO thelastthreerecipes (user_id, id, date) VALUES ('${user_id}', '${recipe_id}', NOW())`
        );
        console.log("result:", result);
    }
        // Check the inserted row
        const verifyQuery = `SELECT * FROM thelastthreerecipes WHERE user_id='${user_id}' AND id='${recipe_id}'`;
        const verifyResult = await DButils.execQuery(verifyQuery);
        if (verifyResult.length > 0) {
          console.log("Row successfully inserted");
        } else {
          console.log("Row was not inserted");
        }
  }

  
  async function getThreeLastRecipes(user_id){
    console.log(user_id)
    // Get the number of recipes saved by the user
    const countQuery = `SELECT COUNT(*) AS count FROM thelastthreerecipes WHERE user_id='${user_id}'`;
    const countResult = await DButils.execQuery(countQuery);
    const totalCount = countResult[0].count;
    if(totalCount < 4) {
        const recipes_id = await DButils.execQuery(`select id from thelastthreerecipes where user_id='${user_id}'`);
        return recipes_id;
    }
    else{
        const recipesQuery = `SELECT id FROM thelastthreerecipes WHERE user_id='${user_id}' ORDER BY date DESC LIMIT 3`;
        const recipesResult = await DButils.execQuery(recipesQuery);
        const lastThreeRecipeIDs = recipesResult.map((row) => row.id);
        console.log(lastThreeRecipeIDs)
        return recipesResult;
    }
}


async function getObserved(user_id){
    const recipes_id = await DButils.execQuery(`select id from thelastthreerecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function markAsFamilyRecipes(user_id, username, recipe_id, title, image, how_to_make, time_to_make, likes, is_vegan, is_gluten_free, servings){
    await DButils.execQuery(`insert into familyrecipes values ('${user_id}','${username}',${recipe_id},'${title}','${image}','${how_to_make}','${time_to_make}','${likes}','${is_vegan}','${is_gluten_free}','${servings}')`);
}

async function getFamilyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from familyrecipes where user_id='${user_id}'`);
    return recipes_id;
}


exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.markAsMyRecipes = markAsMyRecipes;
exports.getMyRecipes = getMyRecipes;
exports.getThreeLastRecipes = getThreeLastRecipes
exports.markAsObserved =markAsObserved
exports.getObserved = getObserved
exports.markAsFamilyRecipes = markAsFamilyRecipes
exports.getFamilyRecipes = getFamilyRecipes