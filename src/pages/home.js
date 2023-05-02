
import { getData, getRecipe, getNext, getPrevious } from '../services/recipe-api.js'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Home () {

  const [recipes, setRecipes] = useState(null);
  const [search, setSearch] = useState('');
  const [calories, setCalories] = useState('');
  const [meal, setMeal] = useState('');
  const [cusine, setCusine] = useState('');
  const [glutenFree, setGlutenFree] = useState(true);
  const [dairyFree, setDairyFree] = useState(true);

let data;

 let cusineTipes =  ['Any Type', 'American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern',	'Nordic', 'South American'];

  let mealType = [ '', 'Breakfast', 'Lunch', 'dinner', 'snack', 'teatime']
  
  let tempData;
  if (data == undefined) {
    tempData = getData();
  }

  useEffect(() => {
    setRecipes(tempData);
  }, [tempData]);


  const getRecipes = () => {
   data = getRecipe(search, meal, calories, cusine, glutenFree, dairyFree);
   data.then((temp)=> {
    if (temp) setRecipes(temp); 
   })
   setRecipes(data)
  }

  const nextPage = () => {
    console.log()
    data = getNext(recipes._links.next.href );
      data.then((temp)=> {
    if (temp) setRecipes(temp); 
   })
  }

  const previoustPage = () => {
    data = getPrevious();
    data.then((temp)=> {
      if (temp) setRecipes(temp); 
    })
  }

    return (
        <div className="home">
          <div className="user-form">
            
            <div className="search-form">
            <input className="form-control form-control-search" placeholder="Search a recipe"
              onChange={(e) => {
              setSearch(e.target.value) 
              }}></input> 

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
                setCalories(e.target.value) 
              }} type="number"></input>

            <select onChange={(e) => {
              setCusine(e.target.value);
              }}>
              <option value="" disabled selected hidden>Cusine Type</option>
                
                {
                  cusineTipes.map((each, i) => {
                    return (
                      <option key={i} value={each}> {each}</option>
                    )
                  })
                }   
            </select>
            </div>

            <div className="toggles">

              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="mySwitch"           name="darkmode" value="yes" checked = {glutenFree}
                    onChange={(e) => { glutenFree ? setGlutenFree(false) : setGlutenFree(true) }}  />
                <label className="allergy-label">Gluten Free</label>
              </div>

              <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="mySwitch"   name="darkmode" value="yes" checked = {dairyFree}
                    onChange={(e) => { dairyFree ? setDairyFree(false) : setDairyFree(true) }} />
                  <label className="allergy-label">Dairy Free</label>
              </div>

            </div>

            <button type="button" onClick={getRecipes} className=""> search </button>
          </div>
          
        <div className="recipe-container">
          {
          recipes && recipes.hits !== undefined ?
          recipes.hits.map((each) => {  
              let symbol = each.recipe.label
              return (
                <div className="recipe-card">
                  <Link to={`/${symbol}`} state={each}  className="link">
                    <img src={each.recipe.images.REGULAR.url} alt="" width="300px" height="160px" />
                    <div className="recipe-name-section">
                      <h4> {each.recipe.label}</h4>
                      <div className="recipe-details-section">                      
                          {
                            each.recipe.healthLabels.map((label) => {
                              if(label == "Gluten-Free") 
                              return (<div className="labels"> 
                              <div className="allergy"><p className="allergy"> Gluten</p> <p className="allergy"> Free</p></div>
                              </div>)
                            })
                            }
                          {
                            each.recipe.healthLabels.map((label) => {
                              if(label == "Dairy-Free") 
                              return (<div className="labels allergy"> 
                              <div className="allergy"><p className="allergy"> Dairy</p> <p className="allergy"> Free</p></div>
                              </div>)
                            })
                            }
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
                    </div>
                    </div>
                  </Link>
                </div>
                
              )
              })
            : <div> </div>
          }
        </div>
          <div className="previous-next">
              {recipes ? <button onClick={previoustPage}> previous page </button>: <div></div> }
              {recipes ? <button onClick={nextPage}> next page </button> : <div></div> }
          </div>
    </div>     
    );
    
  }
  
  