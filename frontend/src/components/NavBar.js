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
          {/* <button onClick={() => navigate({isLogin: false})}>Can I do this</button>        */}
          <NavLink to="/logout" activeStyle>
            Logout
          </NavLink>
          {/* <h1>Logout</h1> */}
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default NavBar;