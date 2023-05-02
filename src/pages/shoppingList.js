
import { getShoppingList, removeFromShoppingList } from '../services/recipe-api.js';
import {useState, useEffect} from "react";

export default function ShoppingList (){

  let [list, setList] = useState([]);
  // let [ing, setIng] = useState(""); 

  useEffect(() => {
    setList(getShoppingList());
  },[])

  const func =  (ingrid) => {
    let temp = removeFromShoppingList(ingrid)
    console.log(temp);
    setList([...temp]);
  }

  return <div>
    <h2>Shopping List</h2>
    {list.map((ingrid, i) => {
          return (<div className="listOfIngredients"> 
            {/* {console.log(ingrid)} */}
              <span>{ingrid}</span>
            <button onClick ={(e) => func(ingrid)} className="removeBtn">X</button>
            </div>)
        })}
        {/* {ing?  <span>{ing}</span> : <span>{ing}</span>} */}
        </div>
};





  // const reRender = (ingrid) => {
  //   temp = removeFromShoppingList(ingrid)
    
  // }
  // useEffect(() => {
  //   setList(temp);
  // }, [temp])

