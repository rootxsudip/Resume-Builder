import React, { useState } from "react";
import './App.css';
import Navbar from './Components/Navbar';
import { Outlet } from "react-router-dom";
import LoginPop from "./Components/LoginPop";



export default function App(){

    const [showLogin, setShowLogin] = useState(false)


    return (
        <>
        {showLogin?<LoginPop setShowLogin={setShowLogin}/>:<></>}
        <Navbar setShowLogin={setShowLogin}/>
        <Outlet/>
        </>
    )
}