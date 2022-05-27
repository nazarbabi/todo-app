import React from "react";
import classes from './Navigation.module.css';
import {NavLink} from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className={classes.navigation}>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='todos'>Todos</NavLink>
      <NavLink to='pictures'>Pictures</NavLink>
    </nav>
  )
}

export default Navigation;