import React from 'react'
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer'
import Menu from './Menu/Menu';
import { Outlet } from 'react-router-dom';
import "../../../styles/global.scss";
import {
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
  
export default function Layout() {
    const queryClient = new QueryClient();
  return (
    <div className="adminmain">
        <Navbar />
        <div className="adminContainer">
          <div className="adminMenuContainer">
            <Menu />
          </div>
          <div className="adminContentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
  );
}
