
import {useParams} from "react-router-dom";
import {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { setShoppingList, removeFromShoppingList } from '../services/recipe-api.js';

let shoppingList = [];

export default function Stock (props){
  const params = useParams()
  const symbol = params.symbol;

  let [list, setList] = useState([]);
  // const [recipe, setRecipe] = useState(null);

  const location = useLocation()
  const data  = location.state;

  
  let array = [];
  return (
    <div className="recipe-page">
      <img src={data.recipe.images.REGULAR.url} alt="" width="60%" height="50%" />

      <div className="recipe-page-details">
        <h2>{data.recipe.label}</h2>

        <div className="recipe-details-section">
                          { data.recipe.healthLabels.map((label) => {
                              if(label == "Gluten-Free") 
                                return ( <div className="labels"> 
                                  <div><p> Gluten</p> <p> Free</p></div>
                                 </div>) 
                              })  
                          }
                            {
                              data.recipe.healthLabels.map((label) => {
                                if(label == "Dairy-Free") 
                                return (<div className="labels"> 
                                <div><p> Dairy</p> <p> Free</p></div>
                                </div>)
                              })
                            }
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

        <h5 >Ingredients</h5>
        <div  className="ingredients">{data.recipe.ingredients.map((ingrid, i) => {
          array.push('false')
          return (<div className="ingredients-page-row">
            <input type="checkbox" id="check" name="option" className="checkBox" checked = {list[i]}
                  onChange={(e) => { if (list[i]){  
                    removeFromShoppingList(ingrid.text);
                    list[i] = false;
                  }
                  else { 
                    shoppingList.push(ingrid.text);
                    setShoppingList(shoppingList);
                    list[i] = true;
                   } }} ></input>
            <label>{ingrid.text}</label>
            </div>)
        })}</div>
        <h5>Directions</h5>
        <div>
          <span>Source: <a href={data.recipe.url} target="_blank">{data.recipe.source}</a></span>
        </div>
      </div>
      
    </div>
  )
}