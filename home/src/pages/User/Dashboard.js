import React from 'react'
import NavbarWithUserIcon from '../../Components/NavbarWithUserIcon';
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
    <NavbarWithUserIcon/>
    <Outlet/>
    </>
  )
}
