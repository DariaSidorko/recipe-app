import { Link } from "react-router-dom";

export default function Nav (props){
  return (
    <header>
      <Link to="/" className="menu-link">
        <div className="menu-link" >HOME</div>
      </Link> 
      <Link to="/about" className="menu-link">
        <div className="menu-link">ABOUT</div>
      </Link>
      <Link to="/shoppingList">
        <div>SHOPPING LIST</div>
      </Link>
    </header>
  );
};