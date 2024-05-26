import React from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom';
import DetailsFillingPage from '../Components/resume/DetailsFillComponents/DetailsFillingPage';
import Home from '../Components/resume/HomePage/Home'
// import NavBar from './Components/Navigation/Navbar'
import MyResume from '../Components/resume/ResumeDisplay/MyResume';


import './templates.css';

// This component defines routing for other components 
// Home page displays the different templates from which user can select either of them.
//'detailsfillingpage' displays the detailsfillingpage inside which there are nested routes to display personalinfo, workexperience, education and keyskills page.
//'myresume' displays the resume created by the user. 
//'about' displays the AboutUs page of the app.
function Templates() {
  return (
    <div>
        {/* <div> 
          <NavBar/>
        </div> */}
        
        <div>
            <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
            </Routes> 
        </div>
    </div>
  )
}


export default Templates


