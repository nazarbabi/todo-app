import React, {Fragment, useCallback, useEffect, useState} from "react";
import TodoItem, {TodoType} from "./TodoItem";
import TodoFilters, {initialState} from "./filter/TodoFilters";
import classes from "./TodoList.module.css";

const TodoList: React.FC<{ items: TodoType[] }> = ({ items }) => {
  const [todoItems, setTodoItems] = useState(items);
  const [activeFilters, setActiveFilters] = useState(initialState);
  
  const activeFilterHandler = useCallback((activeFilters: {
    searchValue: string,
    statusValue: string,
    dateValue: string
  }) => {
    const {searchValue, statusValue, dateValue} = activeFilters;
    
    const searchQuery = (item: TodoType) => {
      let searchResult = true, statusResult = true, dateResult = true;
      
      if (searchValue) searchResult = item.text.includes(searchValue);
      if (statusValue) statusResult = item.status === statusValue;
      if (dateValue) dateResult = item.date === dateValue;
      
      return searchResult && statusResult && dateResult;
    };
    
    setActiveFilters(activeFilters);
    
    setTodoItems(items.filter(searchQuery));
  }, [items]);
  
  useEffect(() => {
    console.log('TEST');
    activeFilterHandler(activeFilters);
  }, [items, activeFilterHandler, activeFilters]);
  
  const filteredItem = todoItems.map(item => {
      return <TodoItem key={item.id} todo={item}/>
  });
  
  return (
    <Fragment>
      <TodoFilters onFilterChange={activeFilterHandler}/>
      <ul className={classes.items}>
        {!todoItems.length && <p>Filter have not results</p>}
        {todoItems.length > 0 && filteredItem}
      </ul>
    </Fragment>
  )
}

export default TodoList;
