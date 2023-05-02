
// import './App.css';

import {useState, useEffect} from "react";
import { getRecipeAllData } from './services/recipe-api.js'
import Home from './pages/home.js'
import About from './pages/about.js'
import Recipe from './pages/recipe.js'
import Nav from './components/Nav.js'
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';


export default function App() {

  return (
      <div className="App">
        <h1>ALL RECIPES</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/:symbol" element={<Recipe/>}/>
          {/* <Route path="/recipe" element={<Dashboard/>}/> */}
        </Routes>
      </div>
  );
}


