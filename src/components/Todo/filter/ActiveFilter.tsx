import React from "react";
import classes from './ActiveFilter.module.css';

const ActiveFilter: React.FC<{ onRemoveFilter: () => void }> = (props) => {
  return (
    <span className={classes.itemText}>
      {props.children}
      <span className={classes.close} onClick={props.onRemoveFilter}>x</span>
    </span>
  );
}

export default ActiveFilter;
