import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import {useContext} from "react";
import {TodoContext} from "../store/TodoContextProvider";
import Summary from "./Summary";
import classes from './Todos.module.css'

const Todos = () => {
    const todoCtx = useContext(TodoContext);

    return (
        <div className={classes.main}>
            <Summary />
            <NewTodo />
            <div className={classes.content}>
                {todoCtx.items.length === 0 && <p>Haven`t todos yet</p>}
                {todoCtx.items.length > 0 && <TodoList items={todoCtx.items}/>}
            </div>
        </div>
    )
}

export default Todos;