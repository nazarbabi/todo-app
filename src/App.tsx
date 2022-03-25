import React from 'react';
import Todos from "./components/Todos";
import TodoContextProvider from "./store/TodoContextProvider";

function App() {
  return (
    <TodoContextProvider>
      <Todos />
    </TodoContextProvider>
  );
}

export default App;
