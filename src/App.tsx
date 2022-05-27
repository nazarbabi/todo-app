import React from 'react';
import Todos from "./components/Todo/Todos";
import TodoContextProvider from "./store/TodoContextProvider";
import Layout from "./components/Layout";
import './index.css';
import {Routes, Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import Pictures from "./components/Pictures/Pictures";

function App() {
  return (
    <TodoContextProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/pictures' element={<Pictures />} />
        </Routes>
      </Layout>
    </TodoContextProvider>
  );
}

export default App;
