import React, {useContext, useState} from "react";
import {TodoContext} from "../store/TodoContextProvider";
import classes from './TodoItem.module.css';

export type TodoType = { id: string, text: string, date: string, status: string };

const TodoItem: React.FC<{ todo: TodoType }> = (props) => {
  const [inputReadOnly, setInputReadOnly] = useState(false);
  const todoCtx = useContext(TodoContext);
  
  const changeHandler = () => {
    const todo = props.todo;
    todo.status = 'done';
    
    setInputReadOnly(true)
    todoCtx.addTodo(todo);
  }
  
  const ifDone = inputReadOnly || props.todo.status === 'done';
  const itemClass = [classes.item, ifDone ? classes.done : '']
  
  return (
    <li className={itemClass.join(' ')}>
      <span>{props.todo.text}</span>
      <div className={classes.actions}>
        <span>{props.todo.date}</span>
        <button onClick={todoCtx.removeTodo.bind(null, props.todo)}>X</button>
        <input type='checkbox' onChange={changeHandler} checked={ifDone} disabled={ifDone}/>
      </div>
    </li>
  )
}

export default TodoItem;
