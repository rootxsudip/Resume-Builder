import {React,useState,useEffect} from 'react'
import './templates.css';
import {Link, useNavigate} from 'react-router-dom'
import {templateImagesPaths} from '../Components/resume/Data/Data'//templateImagesPaths is imported from Data.js which is used to display static images of various templates on the Home page.
import { useDispatch } from 'react-redux'
import { useResumes } from '../context/ResumeContext';
import axios from 'axios';
import useAuth from '../hooks/useAuth'
import { updatePersonalInfo, updateState,  updateWorkExperience, updateEdu,  updateSkills } from '../ReduxManager/dataStoreSlice'

export default function Resumes() {
    const shortid = require('shortid')
    // const [resumes, setResumes] = useState([]);

    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver')//this state is used to display 'useTemplate' button when user hovers over the template
    
    const dispatch = useDispatch();

    const { auth } = useAuth(); 
    const { resumes, deleteResume, addResumes } = useResumes();
    const navigate = useNavigate();

   // Fetch resumes from backend API
   const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/resumes', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        //   Authorization: `Bearer test`,
        },
      });
      addResumes(response.data); // Update users state with data from the backend
    //   console.log(response.data)
    } catch (error) {
      console.error('Error fetching resumes:', error);
      // Optionally, you can handle errors and display a message to the user
    }
  };

  const delResume = async (id) => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:8080/api/users/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        //   Authorization: `Bearer test`,
        },
      });
      deleteResume(id)
    //   console.log(response.data)
    } catch (error) {
      console.error('Error deleting resume:', error);
      // Optionally, you can handle errors and display a message to the user
    }
  };

  useEffect(() => {
    console.log("Component rendered");
    fetchResumes(); // Call the fetchUsers function when the component mounts
  },[]);

  


  const  updateResumeGlobally = (userInfo,workExp,edu,skills,template,id,profilePic) =>{
    dispatch(updateState({  //this dispatch function is used to update value of 'selectedTemplate' with the targetedTemplate in dataStoreSlice.js//
        key: 'selectedTemplate',
        value: template
        }))

    dispatch(updateState({  //this dispatch function is used to update value of 'selectedTemplate' with the targetedTemplate in dataStoreSlice.js//
        key: 'id',
        value: id
        }))

    dispatch(updateState({
        //this dispatch functions update the value of 'showErrorMessages' as false,when there is errorMessages is empty or 'prop.isFormValid'=== true, which will be used by 'TextField' component to hide warning Message beneath each of the 'TextField' where some kind of validation is required.
        key: 'showErrorMessages',
        value: false
    }))
    
    dispatch(updateState({
        key:'errorMessages',
        value:{}
    }))
    for(const key in userInfo){
        console.log(`${key}:${userInfo[key]}`)
        dispatch(updatePersonalInfo({
            //this function updates the targeted key of the personalInfo element of dataStore in dataStoreSlice.js //
            key: key,
            value: userInfo[key]
         }))
    }

    dispatch(updateWorkExperience(workExp))


    dispatch(updateEdu(edu))

    dispatch(updateSkills(skills))

    dispatch(updateState({
        key:'imageFile',
        value:profilePic,
    }))
  }

//   Resume update/view
  const resumeUpdate=(userInfo,workExp,edu,skills,template,id,profilePic)=>{
    
    updateResumeGlobally(userInfo,workExp,edu,skills,template,id,profilePic)
  }

//   Resume view
  const resumeView=(userInfo,workExp,edu,skills,template,id,profilePic)=>{
    
    updateResumeGlobally(userInfo,workExp,edu,skills,template,id,profilePic)
  }

   // Share resume to public
   const shareResume = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/resumes/shares/${id}`,
        { },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data); // Update users state with data from the backend
      fetchResumes()
    } catch (error) {
      console.error('Error sharing resumes:', error);
    }
  };

  return (
    <div style={{minWidth:'300px'}}>
    
            <div className='d-flex justify-content-center mt-5' >
                
                <h3 className='p-2 rounded' style={{backgroundColor:'aliceblue'}}>Your resumes</h3>
            </div>
           

            <div className='container' style={{color:'#1f4287',}}>

                <div className='row'>
                    {/* {templateImagesPaths.map((currentTemplate)=>{ */}
                    {resumes.map((resume)=>{
                            return(
                                <div className='col col-lg-3 col-md-6  col-12 mt-5' key={shortid.generate()}>
                                    <div 
                                        style= {{ position:'relative'}}
                                        onMouseOver= {()=>{
                                            //this function allows us to display 'Use Template'button on the top of the targeted template, when the user hovers over it by setting state's value to the targeted template name.//
                                            setIsMouseOver(resume.id)
                                        }}
                                        onMouseOut= {()=>{
                                            //this function allows us to hide 'Use Template' button when the user moves out from the particular template//
                                            setIsMouseOver('MouseIsNotOver')
                                        }}
                                    >
                                    <div className='w-100 d-flex justify-content-center'><h3>{resume.template.templateName}</h3></div>
                                        <img className="w-100 image-aspect-ratio" src={templateImagesPaths[resume.template.id-1].imageSource} alt='template'/>
                                    {isMouseOver === resume.id           //this conditional rendering is showing 'useTemplate' button when isMouseOver === currentTemplate.name //
                                        ?(<div>
                                            <div
                                            style={{display: 'flex'}}
                                            >
                                            <Link to="/detailsfillingpage/personalinfo">
                                            <button className='btn btn-success'
                                                    style={{position: 'sticky', top:'50%' , right:'20%', marginRight: '5px'}}
                                                    onClick = {() =>{ resumeUpdate(resume.userInfo,resume.workExperience,resume.edu,resume.skills,resume.template.templateName,resume.id,resume.profile_pic) }}
                                                    >
                                            Edit
                                            </button>
                                            </Link>
                                            <button className='btn btn-danger'
                                            style={{position: 'absolute',top:'60%' , right:'30%', marginRight: '5px'}}
                                            onClick = {() =>{ delResume(resume.id) }}
                                            >
                                            Delete
                                            </button>
                                            {!resume.sharedUrl ?(
                                              <button className='btn btn-info'
                                              style={{position: 'sticky',top:'60%' , right:'30%',}}
                                              onClick = {() =>{ shareResume(resume.id) }}
                                              >
                                            Share
                                            </button>
                                            ): (
                                              <button className='btn btn-info'
                                              style={{position: 'sticky',top:'60%' , right:'30%',}}
                                              onClick = {() =>{ navigate(`/shared/resume/${resume.sharedUrl}`) }}
                                              >
                                            View Shared Resume
                                            </button>
                                            )}
                                            </div>
                                            <Link to="/myresume">
                                            <button className='btn btn-primary'
                                            style={{position: 'absolute', top:'50%' , right:'30%',}}
                                            onClick = {() =>{ resumeView(resume.userInfo,resume.workExperience,resume.edu,resume.skills,resume.template.templateName,resume.id,resume.profile_pic) }}
                                            >
                                            Preview
                                            </button>
                                            </Link>
                                            </div>
                                                        )
                                        :null
                                    }
                                </div>

                                            </div>
                                            
                                        )
                                    })}
                </div>
            </div>
            
            
        </div>
  )
}

export const {updateResumeGlobally} = Resumes 