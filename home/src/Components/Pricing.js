import { useEffect } from 'react';
import React from 'react';
import './Pricing.css';
import {useSubscription} from '../context/SubscriptionContext'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { useNavigate,useSearchParams } from 'react-router-dom';

const Pricing = () => {
  const [queryParameters] = useSearchParams()
  const {subscription,setSubscription} = useSubscription();
  const {auth} = useAuth();
  let url = ''
  let data = ''
  const navigate = useNavigate();

  const monthlyData = {
    "intent": "CAPTURE",
    "purchase_units": [
      {
        "amount": {
          "currency_code": "USD",
          "value": "5.00"
        }
      }
    ]
  }

  const annuallyData = {
    "intent": "CAPTURE",
    "purchase_units": [
      {
        "amount": {
          "currency_code": "USD",
          "value": "50.00"
        }
      }
    ]
  }

  const upgradePlan = async (plan) => {
    if(plan === 'MONTHLY'){
      url  = "http://localhost:8080/api/checkout?plan=monthly"
      data = monthlyData
    }else{
      url = "http://localhost:8080/api/checkout?plan=annualy"
      data = annuallyData
    }
    try{
        const response = await axios.post(url,
            data,
            {
                headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
                'Content-Type': 'application/json'
                }
            });
            console.log(JSON.stringify(response?.data.links[1].href));
            window.location.href = response.data.links[1].href
    }catch(err){
        if(!err?.response){
            console.log('No Server Response');
        }else if(err.response?.status === 403){
            console.log('Unauthorized');
        }else{
            console.log('Plan upgrade failed');
        }
    }
  };

  const checkout = async (plan,token,PayerID) => {
    console.log(plan)
    console.log(token)
    try{
      const response = await axios.get(`http://localhost:8080/api/checkout/success?plan=${plan}&token=${token}&PayerID=${PayerID}`,
          {
              headers: {
              'Authorization': `Bearer ${auth.accessToken}`,
              'Content-Type': 'application/json'
              }
          });
          setSubscription(response.data)
  }catch(err){
      if(!err?.response){
          console.log('No Server Response');
      }else if(err.response?.status === 403){
          console.log('Unauthorized');
      }else{
          console.log('Plan upgrade failed');
      }
  }
  }
  useEffect(() => {
  const plan = queryParameters.get("plan")
  const token = queryParameters.get("token")
  const PayerID = queryParameters.get("PayerID")
    if (plan && token) {
      // Call your function here
      checkout(plan,token,PayerID)
    }
  }, []); // Run the effect when the search part of the URL changes


  return (
    <div className="pricing">
      {/* <p>Type: {queryParameters.get("plan")}</p>
      <p>Name: {queryParameters.get("token")}</p>
      <p>Name: {queryParameters.get("PayerID")}</p> */}
      {/* {plans.map((plan, index) => (
        <div className="card" key={index}>
          <h2>{plan.title}</h2>
          <p className="price">{plan.price}</p>
          <p className="duration">{plan.duration}</p>
          <ul>
            {plan.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          {plan.showButton && <button>{plan.buttonText}</button>}
        </div>
        
      ))} */}
       <div className="card">
          <h2>Basic</h2>
          <p className="price">$0</p>
          <p className="duration">Free</p>
          <ul>
              <li>Access to limited content</li>
              <li>Basic analytics</li>
              <li>Limited customization options</li>
          </ul>
          {
           subscription.planType === 'FREE' ? (
            <button disabled>Current Plan</button>
           )
           : (<button>Get Started</button>)
          }
        </div>
       <div className="card">
          <h2>Monthly</h2>
          <p className="price">$5</p>
          <p className="duration">Per Month</p>
          <ul>
          <li>Access to all content</li>
          <li>Priority support</li>
          <li>Monthly updates</li>
          </ul>
          {
           subscription.planType === 'MONTHLY' ? (
            <button disabled>Current Plan</button>
           )
           : (<button onClick={()=>{upgradePlan('MONTHLY')}}>Choose Plan</button>)
          }
        </div>
        <div className="card">
          <h2>Annual</h2>
          <p className="price">$50</p>
          <p className="duration">Per Month</p>
          <ul>
              <li>Access to all content</li>
              <li>Priority support</li>
              <li>Full customization options</li>
          </ul>
          {
           subscription.planType === 'ANNUALLY' ? (
            <button disabled>Current Plan</button>
           )
           : (<button onClick={()=>{upgradePlan('ANNUALLY')}}>Choose Plan</button>)
          }
        </div>
    </div>
    
  );
};

export default Pricing;