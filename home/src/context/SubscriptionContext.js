import React, { createContext, useState, useEffect, useContext } from 'react';


const SubscriptionContext = createContext({});


export const SubscriptionProvider = ({ children }) => {
    
    const [subscription,setSubscription] = useState(()=>{
        const storedSubscription = localStorage.getItem('subscription');
        return storedSubscription ? JSON.parse(storedSubscription) : {};
    });

    useEffect(()=>{
        localStorage.setItem('subscription',JSON.stringify(subscription))
    },[subscription])

    return (
        <SubscriptionContext.Provider value={{ subscription,setSubscription }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => useContext(SubscriptionContext);
