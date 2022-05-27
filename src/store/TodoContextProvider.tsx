import React, {FC, useEffect, useState} from "react";
import {TodoType} from "../components/Todo/TodoItem";

const defaultValue = {
  items: [],
  summary: { all: 0, done: 0 },
  addTodo: (todo: TodoType) => {
  },
  removeTodo: (todo: TodoType) => {
  }
};

export const TodoContext = React.createContext<{
  items: TodoType[],
  summary: { all: number, done: number },
  addTodo: (todo: TodoType) => void,
  removeTodo: (todo: TodoType) => void
}>(defaultValue);

const saveStorage = (data: {}) => {
  localStorage.setItem('todoData', JSON.stringify(data));
}

const loadStorage = () => {
  const data = localStorage.getItem('todoData');
  
  if (data) {
    return JSON.parse(data);
  }
  
  return {items: [], summary: {all: 0, done: 0}};
}

const TodoContextProvider: FC = props => {
  const initialData = loadStorage();
  
  const [todoItems, setTodoItems] = useState<TodoType[]>(initialData.items);
  const [summary, setSummary] = useState<{ all: number, done: number }>(initialData.summary);
  
  const addTodoHandler = (todo: TodoType) => {
    const existTodo = todoItems.findIndex(item => item.id === todo.id);
    
    if (existTodo < 0) {
      setSummary(prevState => {
        return {...prevState, all: prevState.all + 1}
      });
      setTodoItems(prevState => prevState.concat(todo));
    } else {
      const updatedTodos = [...todoItems];
      updatedTodos[existTodo] = todo;
      
      setTodoItems(updatedTodos);
      
      if (todo.status) {
        setSummary(prevState => {
          return {...prevState, done: prevState.done + 1}
        });
      }
    }
  }
  
  const removeTodoHandler = (todo: TodoType) => {
    setTodoItems(prevState => prevState.filter((item) => item.id !== todo.id));
    
    setSummary(prevState => {
      return {all: prevState.all - 1, done: prevState.done - (todo.status === 'done' ? 1 : 0)}
    });
  }
  
  useEffect(() => {
    saveStorage({items: todoItems, summary});
  }, [todoItems, summary]);
  
  return (
    <TodoContext.Provider value={{
      items: todoItems,
      summary,
      addTodo: addTodoHandler,
      removeTodo: removeTodoHandler
    }}>
      {props.children}
    </TodoContext.Provider>
  )
};

export default TodoContextProvider;
