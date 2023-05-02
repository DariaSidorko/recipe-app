
import {useParams} from "react-router-dom";
import {useState} from "react";
import { Link, useLocation } from "react-router-dom";

let shoppingList = [];

export default function Stock (props){
  const params = useParams()
  const symbol = params.symbol;

  const [recipe, setRecipe] = useState(null);

  const location = useLocation()
  const data  = location.state;

  let addToList = false;

  const addToShoppingList = (ingredient) => {
    if(ingredient !== '') shoppingList.push(ingredient);
    console.log(shoppingList);
  }
  

  return (
    <div className="recipe-page">
      <img src="https://www.seriouseats.com/thmb/WzQz05gt5witRGeOYKTcTqfe1gs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/butter-basted-pan-seared-steaks-recipe-hero-06-03b1131c58524be2bd6c9851a2fbdbc3.jpg" alt="" width="100%" height="200px" />

      <div className="recipe-page-details">
        <div>{data.recipe.label}</div>

        <div className="recipe-details-section">
                          <div className="labels"> 
                            {/* {console.log(each.recipe.healthLabels)} */}
                            {
                              data.recipe.healthLabels.map((label) => {
                                if(label == "Gluten-Free") 
                                return (<div><p> Gluten</p> <p> Free</p></div>)
                              })
                              }
                          </div>
                          <div className="labels"> 
                            {/* {console.log(each.recipe.healthLabels)} */}
                            {
                              data.recipe.healthLabels.map((label) => {
                                if(label == "Dairy-Free") 
                                return (<div><p> Dairy</p> <p> Free</p></div>)
                              })
                              }
                          </div>
                          <div  className="labels"> 
                            <p>Ingred:</p> 
                            <p>{data.recipe.ingredientLines.length}</p>
                          </div>
                          <div className="labels">  
                            <p>Cal: </p> 
                            <p>{Math.round(data.recipe.calories)}</p>
                          </div>
                          <div className="labels">  
                            <p>Time:</p> 
                            <p>{data.recipe.totalTime} min</p>
                          </div>
                       </div>

        <h5>Ingredients</h5>
        <div>{data.recipe.ingredients.map((ingr) => {
          return (<div>
            {/* <input checked = {addToList}
                  onChange={(e) => { if (addToList){  
                    addToShoppingList(ingr.text); 
                    addToList = false;
                  }
                  else {
                    addToShoppingList('');
                    addToList = true;
                   } }} ></input> */}
            <label>{ingr.text}</label>
            </div>)
        })}</div>
        <h5>Directions</h5>
        <div>
          <span>Source: <a href={data.recipe.url} target="_blank">{data.recipe.source}</a></span>
        </div>
        {/* <iframe src="http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html" width={600} height={500}/> */}
      </div>
      
    </div>
  )
}