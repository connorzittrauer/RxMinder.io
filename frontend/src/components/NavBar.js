import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavBarElements";
import { Navigate, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/medications" activeStyle>
            Medications
          </NavLink>
          <NavLink to="/interactions" activeStyle>
            Interactions
          </NavLink>
          
          <NavLink to="/" onClick={() => console.log("needs to navigate to the login page")} activeStyle>
            Logout
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default NavBar;