import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Home from "./views/Home";
import Layout from "./views/Layout";
import Task from "./components/Task/Task";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";

function App() {
  return <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginView/>} />
        <Route path='/registration' element={<RegistrationView/>} />
        <Route path='/task/:id' element={<Task />} />
      </Route>
    </Routes>
  </>;
}

export default App;
