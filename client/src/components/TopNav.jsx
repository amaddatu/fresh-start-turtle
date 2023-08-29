import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useLogin } from "../utils/LoginContext";

export default function TopNav(props) {
  const {state} = useLogin();
  const location = useLocation();
  // console.log(location);
  const setCurrent = (current) => {
    location.pathname === current ? "page" : false;
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        
        <div className="" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                className={isActive => "nav-link" + (isActive ? " active" : "")} 
                aria-current={setCurrent("/")} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              
              <NavLink 
                className={isActive => "nav-link" + (isActive ? " active" : "")} 
                aria-current={setCurrent("/game")} to="/game">Game</NavLink>
            </li>
            { state.loggedIn ? (
              <li className="nav-item">
              <NavLink 
                className={isActive => "nav-link" + (isActive ? " active" : "")} 
                aria-current={setCurrent("/logout")} to="/logout">Logout</NavLink>
              </li>
            ) : (

              <li className="nav-item">
              <NavLink 
                className={isActive => "nav-link" + (isActive ? " active" : "")} 
                aria-current={setCurrent("/login")} to="/login">Login</NavLink>
            </li>
            )}
            {/* <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li> */}
          </ul>


        </div>
      </div>
    </nav>
  )
}