import React from 'react'
import {FileEarmarkTextFill} from 'react-bootstrap-icons'
import {Link} from 'react-router-dom'
import './Navbar.css'


function NavBar(){
    return(
      
        <div style={{marginLeft:"0.5%",marginRight:"0.5%", backgroundColor:'#fff',color:'#07588a',zIndex:10,borderRadius:"7px",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <nav className="navbar navbar-expand-lg navbar-light p-0 m-0 ">
                <div className="container-fluid  ">
                  <div className="navbar-brand d-flex align-items-center" style={{color:'#07588a',fontSize:'30px', fontWeight:"600"}}>
                    <div className='me-3 mb-2'><FileEarmarkTextFill/></div>
                    
                    <div style={{color:"#bc50fb", fontFamily:"sans-serif",fontweight:" bold",fontSize:"50px"}}> ResumeSnap. </div>
                    
                    
                  </div>

                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                    <div className='flex-grow-1'></div>
                    <div className="navbar-nav mb-2 ms-5 ">
                      <li className="nav-item">
                      {/* /*this link will show the Home page */}                                                                                                 
                        <Link to='/' className="nav-link active me-4" style={{textDecoration:'none',color:'#07588a',fontSize:"30px"}}>Resume Templates</Link> 
                      </li>
                      <li className="nav-item">
                        {/* this link will show the MyResume page displaying the preview of the resume created by the user. */}
                        <Link to='/myresume' className="nav-link active me-4" style={{textDecoration:'none',color:'#07588a',fontSize:"30px"}} >My Resume</Link>
                      </li>
                      
                    </div>
                  </div>
                </div>
            </nav>  
        </div>
       
    )
}

export default NavBar
