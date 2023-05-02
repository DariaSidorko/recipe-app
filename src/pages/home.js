
import { getRecipeData, getRecipe, getNext, getPrevious, currentRecipeList } from '../services/recipe-api.js'
import { useState, useEffect } from "react";
import Recipies from '../allRecipies.js'
import { Link } from "react-router-dom";

let data;

export default function Home () {

  const [recipes, setRecipes] = useState(null);
  const [search, setSearch] = useState('');
  const [calories, setCalories] = useState('');
  const [meal, setMeal] = useState('');
  const [cusine, setCusine] = useState('');
  const [glutenFree, setGlutenFree] = useState(true);
  const [dairyFree, setDairyFree] = useState(true);

 
 let cusineTipes =  ['Any Type', 'American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern',	'Nordic', 'South American'];

  let mealType = [ '', 'Breakfast', 'Lunch', 'dinner', 'snack', 'teatime']
  
  console.log(data);


  const getRecipes = () => {
  // SECTION FOR THE REAL API CALL
  //  data = getRecipe(search, meal, calories, cusine, glutenFree, dairyFree);
  //  data.then((temp)=> {
  //   if (temp) setRecipes(temp); 
  //  })
    data = getRecipeData();
    console.log(data);
   setRecipes(data)
  }

  const nextPage = () => {
    data = getNext(recipes._links.next.href);
      data.then((temp)=> {
    if (temp) setRecipes(temp); 
   })
  }


  // if (data){
  //   setRecipes(data);
  // }
  useEffect(() => {
    setRecipes(data);
  })
  

  // const previoustPage = () => {
  //   data = getPrevious()
  // }

    return (
        <div className="home">
          <div className="user-form">
              <input className="form-control" placeholder="Search a recipe"
              onChange={(e) => {
              setSearch(e.target.value) }}></input> 

            <select 
              onChange={(e) => {setMeal(e.target.value)}} >
                <option value="" disabled selected hidden>Meal Type</option>
                {
                  mealType.map((each, i) => {
                    return (
                      <option key={i} value={each} > {each}</option>
                    )
                  })
                }   
              </select>

            <input className="form-control" placeholder="Calories limit"
              onChange={(e) => {
              setCalories(e.target.value) }} type="number"></input>

            <select onChange={(e) => {setCusine(e.target.value)}}>
            <option value="" disabled selected hidden>Cusine Type</option>
              {
                cusineTipes.map((each, i) => {
                  return (
                    <option key={i} value={each}> {each}</option>
                  )
                })
              }   
            </select>

            {/* <input onChange={(e) => { glutenFree ? setGlutenFree(false) : setGlutenFree(true) }} 
            type="checkbox" id="vehicle1" name="vehicle1" value="Bike" checked = {glutenFree}/>
            <label for="vehicle1"> Gluten Free  </label><br/> */}
            {/* <input onChange={(e) => { dairyFree ? setDairyFree(false) : setDairyFree(true) }}  
            type="checkbox" id="vehicle2" name="vehicle2" value="Car" checked = {dairyFree}/>
            <label for="vehicle1"> Dairy Free </label> */}
              <div className="toggles">

                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked = {glutenFree}
                  onChange={(e) => { glutenFree ? setGlutenFree(false) : setGlutenFree(true) }}  />
                  <label>Gluten Free</label>
                 </div>

                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked = {dairyFree}
                  onChange={(e) => { dairyFree ? setDairyFree(false) : setDairyFree(true) }} />
                  <label>Dairy Free</label>
                 </div>

              </div>

            <button type="button" onClick={getRecipes} className=""> search </button>
          </div>
          {/* {
          recipes && recipes.hits !== undefined ?
          <Recipies list = {recipes.hits}></Recipies> : <div> </div>
          } */}
          {/* 
          SECTION FOR THE REAL API CALL
          {
          recipes && recipes.hits !== undefined ?
          recipes.hits.map((each) => {
            return (
              <div> {each.recipe.label}</div>
            )
            })
          : <div> </div>
          } */}
          <div className="recipe-container">
            {
            recipes ?
            recipes[0].hits.map((each) => {
              let symbol = each.recipe.label
              return (
                <div className="recipe-card">
                  <Link to={`/${symbol}`} state={each}  className="link">
                    <img src="https://www.seriouseats.com/thmb/WzQz05gt5witRGeOYKTcTqfe1gs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/butter-basted-pan-seared-steaks-recipe-hero-06-03b1131c58524be2bd6c9851a2fbdbc3.jpg" alt="" width="300px" height="160px" />
                    <div className="recipe-name-section">
                      <h4> {each.recipe.label}</h4>
                      <div className="recipe-details-section">
                        <div className="labels"> 
                          {/* {console.log(each.recipe.healthLabels)} */}
                          {
                            each.recipe.healthLabels.map((label) => {
                              if(label == "Gluten-Free") 
                              return (<div><p> Gluten</p> <p> Free</p></div>)
                            })
                            }
                        </div>
                        <div className="labels"> 
                          {/* {console.log(each.recipe.healthLabels)} */}
                          {
                            each.recipe.healthLabels.map((label) => {
                              if(label == "Dairy-Free") 
                              return (<div><p> Dairy</p> <p> Free</p></div>)
                            })
                            }
                        </div>
                        <div  className="labels"> 
                          <p>Ingred:</p> 
                          <p>{each.recipe.ingredientLines.length}</p>
                        </div>
                        <div className="labels">  
                          <p>Cal: </p> 
                          <p>{Math.round(each.recipe.calories)}</p>
                        </div>
                        <div className="labels">  
                          <p>Time:</p> 
                          <p>{each.recipe.totalTime} min</p>
                        </div>

                        {/* healthLabels */}
                    </div>
                    </div>
                  </Link>
                </div>
                
              )
              })
            : <div> </div>
            }
          </div>
        {/* <button onClick={previoustPage}> previous page </button> */}
        { recipes ? <button onClick={nextPage}> next page </button> : <div></div> }
        </div>
    );
  }
  