

//import datEach from '../data.js'
import dataAll from '../dataAll.js'

let key = 'fb12c181e8c55f38f83ef386ec7870b8';
let id = 'a65d5e43';
let recipeID = 'recipe_b79327d05b8e5b838ad6cfd9576b30b6';
let currentUrl = '';
let previous = [];
 // https://api.edamam.com/api/recipes/v2/recipe_b79327d05b8e5b838ad6cfd9576b30b6?type=public&app_id=a65d5e43&app_key=%20fb12c181e8c55f38f83ef386ec7870b8

 //https://api.edamam.com/api/recipes/v2?type=public&q=salad&app_id=a65d5e43&app_key=%20fb12c181e8c55f38f83ef386ec7870b8%09&health=gluten-free&health=dairy-free&cuisineType=American&mealType=Lunch&calories=650



// `https://api.edamam.com/api/recipes/v2/${recipeID}?type=public&app_id=${id}&app_key=%20${key}`;

export const getRecipe = async (search, meal, calories, cusine, glutenFree, dairyFree) => {
  
  glutenFree ? glutenFree = 'gluten-free' : glutenFree = '';
  dairyFree ? dairyFree = 'dairy-free' : dairyFree = '';
  //${recipeID}
  currentUrl = `https://api.edamam.com/api/recipes/v2?type=public&${search == '' ? '' : '&q=$' + search}&app_id=${id}&app_key=%20${key}${ glutenFree == '' ? '' : '&health=' + glutenFree}${ dairyFree == '' ? '' : '&health=' + dairyFree}${ cusine == '' ? '' : '&cuisineType=' + cusine}${ meal == '' ? '' : '&mealType=' + meal}${ calories == '' ? '' : '&calories=' + calories}`
  previous = [];
  previous.push(currentUrl);
  const response = await fetch(currentUrl);
  const data = await response.json();

  //console.log(data);
  return data;
}

export const getNext = async(nextUrl) => {
  previous.push(nextUrl);
  const response = await fetch(nextUrl);
  const data = await response.json();
  return data;
}

export const getPrevious = async() => {
  let previousUrl = previous.pop();
  const response = await fetch(previousUrl);
  const data = await response.json();
  return data;
}

export const getRecipeData = (search, meal, calories, cusine, glutenFree, dairyFree) => {
  // glutenFree ? glutenFree = 'gluten-free' : glutenFree = '';
  // dairyFree ? dairyFree = 'dairy-free' : dairyFree = '';
  // let temp = `https://api.edamam.com/api/recipes/v2/${recipeID}?type=public&${search == '' ? '' : '&q=$' + search}&app_id=${id}&app_key=%20${key}${ glutenFree == '' ? '' : '&health=' + glutenFree}${ dairyFree == '' ? '' : '&health=' + dairyFree}${ cusine == '' ? '' : '&cuisineType=' + cusine}${ meal == '' ? '' : '&mealType=' + meal}${ calories == '' ? '' : '&calories=' + calories}`
  //console.log(temp)
  return dataAll;
}

