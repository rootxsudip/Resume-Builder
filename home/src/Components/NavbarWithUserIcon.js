import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import useAuth from '../hooks/useAuth';
import { useProfile } from '../context/ProfileContext';
const NavbarWithUserIcon = () => {

    const { auth } = useAuth(); 
    const { profile } = useProfile(); 
    const navigate = useNavigate()
    const goToMyAccount = () => {
        navigate('/account')
    };
    const handleLogout = () => {
        window.location.href = '/logout';
    }

    return (
        <div className="navbar">
            <img src="/ResumeLogo.png" alt="Logo" />
            <div className="nav-links">
                {/* <Link to="/">Home</Link> */}
                <Link to="/templates">Templates</Link>
                <Link to="/resumes">Resumes</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="user-profile">
                <img src={profile.profile_pic || "./profile_icon.png"} alt="Profile" />
                <ul className='user-profile-dropdown'>
                    <li onClick={goToMyAccount}>
                        <FontAwesomeIcon icon={profile.profile_pic} style={{ color: "#cc55f7" }} />
                        <span>My Account</span>
                    </li>
                    <li onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket}  style={{color: "#352258",}} /> 
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavbarWithUserIcon;