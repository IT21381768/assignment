import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeList from './components/EmployeeList';
import {Helmet} from "react-helmet";


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
        <Helmet>
                <meta charSet="utf-8" />
                <title>Employee Management</title>
               
            </Helmet>
          <NavBar />
          <Routes>
    
            <Route path="/" exact element={<EmployeeList />} />
            
            <Route path="/employee/list" exact element={<EmployeeList/>}/>
          <Route path="/employee/add" exact element={<AddEmployee/>}/>
          <Route path="/employee/edit/:id" exact element={<EditEmployee/>}/>
        
         

          </Routes>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    )
  }
}



