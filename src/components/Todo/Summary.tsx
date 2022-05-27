import {useContext} from "react";
import {TodoContext} from "../../store/TodoContextProvider";
import classes from './Summary.module.css';

const Summary = () => {
  const todoCtx = useContext(TodoContext);
  
  return (
    <div className={classes.summary}>
      <div>
        <span>All: {todoCtx.summary.all}</span>
      </div>
      <div>
        <span>Done: {todoCtx.summary.done}</span>
      </div>
    </div>
  )
}

export default Summary;
