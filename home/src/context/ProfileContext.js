import React, { createContext, useState, useEffect, useContext } from 'react';


const ProfileContext = createContext({});


export const ProfileProvider = ({ children }) => {
    
    const [profile,setProfile] = useState(()=>{
        const storedProfile = localStorage.getItem('profile');
        return storedProfile ? JSON.parse(storedProfile) : {};
    });

    useEffect(()=>{
        localStorage.setItem('profile',JSON.stringify(profile))
    },[profile])

    return (
        <ProfileContext.Provider value={{ profile,setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
