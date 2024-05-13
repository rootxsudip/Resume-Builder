import React from 'react'
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
  
export default function Layout() {
    const queryClient = new QueryClient();
  return (
    <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            {/* <Menu /> */}
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
  );
}
