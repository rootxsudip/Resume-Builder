import React, { useState } from "react";
// import './App.css';
import Navbar from './Components/Navbar';
import { Outlet } from "react-router-dom";
import LoginPop from "./Components/LoginPop";
import useAuth from './hooks/useAuth';
import NavbarWithUserIcon from "./Components/NavbarWithUserIcon";
import Footer from "./Components/Footer"
export default function App(){

    const { auth } = useAuth(); 
    const [showLogin, setShowLogin] = useState(false)


    return (
        <>
        {showLogin?<LoginPop setShowLogin={setShowLogin}/>:<></>}
        {auth.email ? (
            <NavbarWithUserIcon/>
        ) : (

            <Navbar setShowLogin={setShowLogin}/>
        )
        }
        <Outlet/>
        <Footer/>
        </>
    )
}