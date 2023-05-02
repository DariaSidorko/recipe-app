

//import datEach from '../data.js'
// import dataAll from '../dataAll.js'



let key = process.env.REACT_APP_API_KEY;
let id = process.env.REACT_APP_API_ID;
console.log("key:")
console.log(key)

let currentUrl = '';
let previous = [];
let shoppingList = [];

let prevPage;
let data;
let featuredData;

let cusineTypeArray = ['Any Type', 'American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern',	'Nordic', 'South American'];

export const getRecipe = async (search, meal, calories, cusine, glutenFree, dairyFree) => {
  
  glutenFree ? glutenFree = 'gluten-free' : glutenFree = '';
  dairyFree ? dairyFree = 'dairy-free' : dairyFree = '';

  currentUrl = `https://api.edamam.com/api/recipes/v2?type=public&${search == '' ? '' : '&q=$' + search}&app_id=${id}&app_key=%20${key}${ glutenFree == '' ? '' : '&health=' + glutenFree}${ dairyFree == '' ? '' : '&health=' + dairyFree}${ cusine == '' ? '' : '&cuisineType=' + cusine}${ meal == '' ? '' : '&mealType=' + meal}${ calories == '' ? '' : '&calories=' + calories}`
  previous = [];
  prevPage = currentUrl;
  const response = await fetch(currentUrl);
  data = await response.json();

  return data;
}

export const getFeaturedRecipe = async () => {
  let counter = Math.floor(Math.random() * 21);
  // https://api.edamam.com/api/recipes/v2?type=any&app_id=a65d5e43&app_key=%20fb12c181e8c55f38f83ef386ec7870b8%09&health=dairy-free&health=gluten-free&cuisineType=Asian

  let temp = cusineTypeArray[counter]
  currentUrl = `https://api.edamam.com/api/recipes/v2?type=any&app_id=${id}&app_key=%20${key}&health=dairy-free&health=gluten-free&cuisineType=${temp}`
  const response = await fetch(currentUrl);
  featuredData = await response.json();
  return featuredData
}

console.log(cusineTypeArray.length);

export const getData = () => {
  return data;
}

export const getFeaturedRecipeData = () => {
  return featuredData;;
}

export const getNext = async(nextUrl) => {
  previous.push(prevPage);
  prevPage = nextUrl;
  const response = await fetch(nextUrl);
  data = await response.json();
  return data;
}


export const getPrevious = async() => {
  let previousUrl = previous.pop();
  console.log(previous)
  const response = await fetch(previousUrl);
  const data = await response.json();
  return data;
}


export const setShoppingList = (item) => {
  shoppingList = item;
  console.log(shoppingList);
} 

export const removeFromShoppingList = (item) => {
  for(let i=0; i<shoppingList.length; i++){
    if (shoppingList[i] === item)
      shoppingList.splice(i, 1)
  }
  console.log(shoppingList); 
  return shoppingList
} 

export const getShoppingList = () => {
  return shoppingList
} 
