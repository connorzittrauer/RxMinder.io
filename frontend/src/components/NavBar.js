import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavBarElements";


const NavBar = () => {
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
          <NavLink to="/logout" activeStyle>
            Logout
          </NavLink>

        </NavMenu>
      </Nav>
    </>
  );
};
  
export default NavBar;