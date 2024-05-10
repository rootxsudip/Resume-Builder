import React, { useState } from "react";
import './App.css';
import Navbar from './Components/Navbar';
import Home from "./Routes/Home";
import Templates from "./Routes/Templates";
import About from "./Routes/AboutUs";
import { Route, Routes } from "react-router-dom";
import LoginPop from "./Components/LoginPop";



export default function App(){

    const [showLogin, setShowLogin] = useState(false)

    return (
        <>
        {showLogin?<LoginPop setShowLogin={setShowLogin}/>:<></>}

        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/templates' element={<Templates />} />
            <Route path='/about' element={<About />} />
        </Routes>
        
        </>
    )
}