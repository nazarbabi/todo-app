import React, {useContext, useRef} from "react";
import {TodoContext} from "../../store/TodoContextProvider";
import {TodoType} from "./TodoItem";
import classes from './NewTodo.module.css';

const NewTodo: React.FC = () => {
  const todoTextRef = useRef<HTMLTextAreaElement>(null);
  const todoDateRef = useRef<HTMLInputElement>(null);
  
  const todoCtx = useContext(TodoContext);
  
  const addNewTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredText = todoTextRef.current!.value;
    const enteredDate = todoDateRef.current!.value;
    const newTodo: TodoType = {
      id: new Date().toISOString(),
      text: enteredText,
      date: enteredDate,
      status: 'created'
    }
    
    todoCtx.addTodo(newTodo);
    todoTextRef.current!.value = '';
    todoDateRef.current!.value = '';
  }
  
  return (
    <form className={classes.form} onSubmit={addNewTodoHandler}>
      <div className={classes.row}>
        <label htmlFor='text'>Todo:</label>
        <textarea id='text' required ref={todoTextRef}/>
      </div>
      <div className={classes.row}>
        <label htmlFor='date'>Date:</label>
        <input id='date' type='date' required ref={todoDateRef}/>
      </div>
      <div className={classes.row}>
        <button>Add Task</button>
      </div>
    </form>
  );
}

export default NewTodo;
