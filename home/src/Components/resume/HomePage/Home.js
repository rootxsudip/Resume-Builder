import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {templateImagesPaths} from '../Data/Data'//templateImagesPaths is imported from Data.js which is used to display static images of various templates on the Home page.
import { useDispatch,useSelector } from 'react-redux'
import {updateState,resetState} from '../../../ReduxManager/dataStoreSlice'
import { useProfile } from '../../../context/ProfileContext';
import { useSubscription } from '../../../context/SubscriptionContext';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios'
const  shortid = require('shortid')

//this Home component is rendering various resume templates on to the screen and the user can select either of them and proceed further. 
function Home() {
    const { auth } = useAuth();
    const PROFILE_URL = 'http://localhost:8080/api/users/profile';
    const { profile, setProfile } = useProfile();
    const { subscription, setSubscription } = useSubscription();
    
    const setUserProfile = async () => {
        try{
            const response = await axios.get(PROFILE_URL, {
                headers: {
                 Authorization: `Bearer ${auth.accessToken}`,
                },
                });
                console.log(JSON.stringify(response?.data));
                console.log(response.data);
                setProfile(response.data);
        }catch(err){
            if(!err?.response){
                console.log('No Server Response');
            }else if(err.response?.status === 403){
                console.log('Unauthorized');
            }else{
                console.log('Set Profile Failed');
            }
        }
    }

    const setUserSubscription = async () => {
        try{
            const response = await axios.get("http://localhost:8080/api/user/subscription", {
                headers: {
                 Authorization: `Bearer ${auth.accessToken}`,
                },
                });
                console.log(JSON.stringify(response?.data));
                console.log(response.data);
                setSubscription(response.data);
        }catch(err){
            if(!err?.response){
                console.log('No Server Response');
            }else if(err.response?.status === 403){
                console.log('Unauthorized');
            }else{
                console.log('Set Subscription Failed');
            }
        }
    }

    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver')//this state is used to display 'useTemplate' button when user hovers over the template
    
    const dispatch = useDispatch();
    const dataStore = useSelector(state => state.dataStore)

    useEffect(() => {
        console.log("Component rendered");
        console.log(dataStore)
        const store = dispatch(resetState())
        setUserProfile()
        setUserSubscription()
      }, []); // Empty dependency array ensures the effect runs only once, when the component mounts
    
    return (
        <div style={{minWidth:'300px'}}>
    
            <div className='d-flex mt-5' >
                <h3 className='p-2 rounded' style={{backgroundColor:'', marginLeft: '20rem'}}>Welcome, {profile.fullName}</h3>
            </div>
            <div className='d-flex mt-2' >
                <h3 className='p-2 rounded' style={{backgroundColor:'aliceblue',marginLeft: '20rem'}}>Select a Template to get started!</h3>
            </div>
           

            <div className='container' style={{color:'#1f4287',}}>

                <div className='row'>
                    {templateImagesPaths.map((currentTemplate)=>{
                            return(
                                <div className='col col-lg-3 col-md-6  col-12 mt-5' key={shortid.generate()}>
                                    <div 
                                        style= {{ position:'relative'}}
                                        onMouseOver= {()=>{
                                            //this function allows us to display 'Use Template'button on the top of the targeted template, when the user hovers over it by setting state's value to the targeted template name.//
                                            setIsMouseOver(currentTemplate.name)
                                        }}
                                        onMouseOut= {()=>{
                                            //this function allows us to hide 'Use Template' button when the user moves out from the particular template//
                                            setIsMouseOver('MouseIsNotOver')
                                        }}
                                    >
                                    <div className='w-100 d-flex justify-content-center'><h3>{currentTemplate.name}</h3></div>
                                    <img className="w-100 image-aspect-ratio" src={currentTemplate.imageSource} alt='template'/>
                                
                                    {/* { isMouseOver === currentTemplate.name || currentTemplate.name === 'Template 4' ?
                                        (<button className='btn btn-danger'
                                                style={{position: 'absolute',top:'50%' , right:'30%',}}
                                                disabled
                                        >
                                        Need Subscription
                                        </button>)
                                    :(
                                        <Link to="/detailsfillingpage/personalinfo">
                                           
                                            <button className='btn btn-primary'
                                                    style={{position: 'absolute',top:'50%' , right:'30%',}}
                                                    onClick= {()=>{
                                                        dispatch(updateState({  //this dispatch function is used to update value of 'selectedTemplate' with the targetedTemplate in dataStoreSlice.js//
                                                        key: 'selectedTemplate',
                                                        value:currentTemplate.name
                                                        }))
                                                    }}
                                            >
                                            Use Template
                                            </button>
                                            
                                        </Link>
                                    ) : ("")
                                    } */}
                                     {isMouseOver === currentTemplate.name && currentTemplate.name === 'Template 4' && subscription.planType == 'FREE' ? (
                                    <button
                                    className="btn btn-danger"
                                    style={{ position: 'absolute', top: '50%', right: '30%' }}
                                    disabled
                                    >
                                    Need Subscription
                                    </button>
                                ) : isMouseOver === currentTemplate.name ? (
                                    <Link to="/detailsfillingpage/personalinfo">
                                    <button
                                        className="btn btn-primary"
                                        style={{ position: 'absolute', top: '50%', right: '30%' }}
                                        onClick= {()=>{
                                            dispatch(updateState({  //this dispatch function is used to update value of 'selectedTemplate' with the targetedTemplate in dataStoreSlice.js//
                                            key: 'selectedTemplate',
                                            value:currentTemplate.name
                                            }))
                                        }}
                                    >
                                        Use Template
                                    </button>
                                    </Link>
                                ) : null}
                                                            </div>
                                                            </div>
                                
                            )
                        })}
                </div>
            </div>
            
            
        </div>
        
    )
}

export default Home
