const axios = require('axios');

// Define the new user's details
const newUserDetails = {
  user_id: 1,
  username: 'test_username',
  firstname: 'test_firstname',
  lastname: 'test_lastname',
  country: 'test_country',
  password: 'test_password',
  email: 'test_email',
};

// Define the login details
const loginDetails = {
  username: newUserDetails.username,
  password: newUserDetails.password
};

const testServerFlow = async () => {
  try {
    console.log("start");
    // // Register the user
    // let res = await axios.post('http://localhost:80/Register', newUserDetails);
    // console.log("Register:", res.data);

    // Login the user
    res = await axios.post('http://localhost:80/Login', loginDetails);
    console.log("Login:", res.data);

    const sessionCookie = res.headers['set-cookie'][0];

    console.log("Get favorites:", res.data);
    // Fetch recipe details
    // const recipeDetailId = '1';  // Replace with actual recipe id
    // let result = await axios.get(`http://localhost:80/recipes/info${recipeDetailId}`);
    
    // console.log("Recipe details:", result.data);


    // Fetch recipe details
    const recipeDetailId = 9999999;  // Replace with actual recipe id
    const params = { id: recipeDetailId };
    let result = await axios.get(`http://localhost:80/recipes/info`, { params });
    
    console.log("Recipe details:", result.data);


    const how_to_make_data = {
      name: "John Doe",
      amount: 25,
      unit: "ounce"
    };

    const instructions_text =  "first see the egg, then you ccan fix this"
    
    const json = JSON.stringify(how_to_make_data);
    // Define the new recipe details
    const newRecipeDetails = {
        // recipeId: 9999995,
        // user_id: 1,
        username: 'test_username',
        title: 'title',
        image: "image",
        ingredients: how_to_make_data,
        timeToMake: 35,
        likes: 0,
        isVegan: 'test_is_vegan',
        isGlutenFree: 'test_is_gluten_free',
        servingSize: 2,
        instructions: instructions_text,
        analyzedInstructions: instructions_text.split(",").map((instr) => instr.trim()),
    };




  // // Add recipe to familiy
  // res = await axios.post('http://localhost:80/users/familyrecepies', newRecipeDetails, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Cookie': `${sessionCookie}`
  //   }
  // });
  // console.log("Add to myrecipes:", res.data);


  // // Get recipes from familiy
  // res = await axios.get('http://localhost:80/users/familyrecepies', {
  //   headers: {
  //     'Cookie': `${sessionCookie}`
  //   }
  // });
  // console.log("Get from family recepies:", res.data);



  // Add recipe to myrecipes
  // res = await axios.post('http://localhost:80/users/myrecepies', newRecipeDetails, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Cookie': `${sessionCookie}`
  //   }
  // });
  // console.log("Add to myrecipes:", res.data);

  // // Get recipes from myrecipes
  // res = await axios.get('http://localhost:80/users/myrecepies', {
  //   headers: {
  //     'Cookie': `${sessionCookie}`
  //   }
  // });
  // console.log("Get from myrecipes:", res.data);


  // // Fetch recipe details
  // const recipeDetailId2 = '9999999';  // Replace with actual recipe id
  // res = await axios.get(`http://localhost:80/recipes/${recipeDetailId2}`);
  
  // console.log("Recipe details:", res.data);


  // res = await axios.get('http://localhost:80/recipes/randomrecipes');
  // console.log("Random recipes:", res.data);

  // res = await axios.post('http://localhost:80/user/lastwatch');
  // console.log("Random recipes:", res.data);

  // } catch (error) {
  //   console.error(error);
  // }

// Define the login details
const WachedRecipesDetails = {
  user_id: 5,
  recipeId: 9999985
};
// 9999981
//
  // Add recipe to 3lastwached
  // res = await axios.post('http://localhost:80/users/lastwatch', WachedRecipesDetails, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Cookie': `${sessionCookie}`
  //   }

  // });
  // console.log("Add to 3lastwached myrecipes:", res.data);
  // } catch (error) {
  //   console.error(error);
  // }

//   res = await axios.get('http://localhost:80/users/lastwatch', {
//     headers: {
//       // 'Content-Type': 'application/json',
//       'Cookie': `${sessionCookie}`
//     }
//   });
//   console.log("this 3 recpies:", res.data);
//   } catch (error) {
//     console.error(error);
//   }
  //   res = await axios.get('http://localhost:80/users/allobserved', {
  //   headers: {
  //     // 'Content-Type': 'application/json',
  //     'Cookie': `${sessionCookie}`
  //   }
  // });
  // console.log("this all observed recpies:", res.data);

  // res = await axios.get('http://localhost:80/recipes/search', {
  //   params: {
  //     query: 'pasta',
  //     cuisine: 'italian',
  //     diet: 'vegetarian',
  //     intolerances: 'gluten',
  //     number: 10
  //   }
  // })
  // console.log("search:", res.data);
  

  // const noa = await axios.get(`https://api.spoonacular.com/recipes/1098357/information`, {
  //   params: {
  //       includeNutrition: false,
  //       apiKey: process.env.spooncular_apiKey
  //   }
  //   });
  // console.log(noa.data)


  } catch (error) {
    console.error(error);
  }



  // const res = await axios.get(`https://api.spoonacular.com/recipes/1098357/information`, {
  //     params: {
  //         includeNutrition: false,
  //         apiKey: process.env.spooncular_apiKey
  //     }
  // });
};



testServerFlow();

const my_test = async () => {
    try {
      console.log("start");
      // Login the user
      // res = await axios.post('http://localhost:80/Login', loginDetails);
      // console.log("Login:", res.data);
      // const sessionCookie = res.headers['set-cookie'][0];
      const res = await axios.get(`https://api.spoonacular.com/recipes/1098357/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
    console.log(res.data)
    }
    catch{
      console.log("error");
    }
}
// my_test()




////////////////////////////////////////////////////////////
// tests for post man:
//register
// {
//   "user_id": 2,
//   "username": "test_username2",
//   "firstname": "test_firstname2",
//   "lastname": "test_lastname2",
//   "country": "test_country2",
//   "password": "test_password2",
//   "email": "test_email2"
// }

//login

// {
//   "username": "test_username",
//   "password": "test_password",
// }


