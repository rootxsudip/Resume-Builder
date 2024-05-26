import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { updatePersonalInfo, updateState, updateWorkExperience, updateEdu, updateSkills } from '../../../ReduxManager/dataStoreSlice'
import axios from 'axios';
import Template1 from '../TemplatesComponents/Template1';
import Template2 from '../TemplatesComponents/Template2';
import Template3 from '../TemplatesComponents/Template3';
import Template4 from '../TemplatesComponents/Template4';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import SuccessMessage from './Modal'
import './a4.css'
<link rel="stylesheet" href="dist/paper.css"></link>
export default function SharedResume() {
  let resume = "";
  const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
  const dispatch = useDispatch();

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

  let { resumeId } = useParams();

  // Fetch resumes from backend API
  const fetchResume = async (resumeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/auth/resume/${resumeId}`, {
        headers: {
        },
      });
      resume = response.data
      updateResumeGlobally(resume.userInfo,resume.workExperience,resume.edu,resume.skills,resume.template,resume.id,resume.profile_pic)
    } catch (error) {
      console.error('Error fetching resumes:', error);
      // Optionally, you can handle errors and display a message to the user
    }
  };

  useEffect(()=>{
    fetchResume(resumeId)
  },[])

  // const containerStyle = {
  //   display: 'flex',
  //   alignItems: 'stretch',
  //   justifyContent: 'stretch',
  //   height: '100vh', // Adjust as needed
  //   width: '100vw',  // Adjust as needed
  // };

 //this component shows the preview of the resume created by the user with the 'Save'and 'Back' button//
 const [showModal, setShowModal] = useState(false)
//  const downloadComponentPDF = () => {
//      //this function is called when the user clicks on the 'Save Resume' button.
//      // it takes the 'div' element with id 'divToPrint' and then convert it into pdf format which is downloaded into the user's computer memory.
//      const input = document.getElementById('divToPrint');
//      html2canvas(input, { scrollY: -window.scrollY })
//      .then((canvas) => {
//          const imgData = canvas.toDataURL('image/png');
//          const pdf = new jsPDF("p", "px", "a4");
//          var ratio = canvas.width/canvas.height;
//          var width = pdf.internal.pageSize.getWidth();
//          var height = width / ratio;
//          pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
//          pdf.save("resume.pdf");
//      })
//      .then(()=>{
//          setTimeout(
//              // this function shows the modal popup named 'SuccessMessage' after the resume has been successfully downloaded and make it to disappear on its own after 6000 ms//
//              ()=>{
//                  setShowModal(true)
//                  setTimeout(
//                      ()=>{
//                          setShowModal(false)  
//                      }
//                  ,6000)
//              }
//          ,100)
//      })
//  ;
//    }
const downloadComponentPDF = () => {
  const input = document.getElementById('divToPrint');
  const a4WidthInMm = 210;
  const a4HeightInMm = 297;

  // Calculate dimensions in pixels
  const mmToPxFactor = 3.779527559; // 1 mm = 3.779527559 pixels
  const a4WidthInPx = a4WidthInMm * mmToPxFactor;
  const a4HeightInPx = a4HeightInMm * mmToPxFactor;

  html2canvas(input, {
    scale: 2, // Increase the scale to ensure high-quality output
    width: a4WidthInPx,
    height: a4HeightInPx
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  });
};


  return (
    <>
    {/* <div>Shared Resume: {resumeId}</div> */}
    {/* <div className='container mt-2'/>*}
    style={containerStyle}
    >
      
                        {/* In this div, user selected template is rendered alongwith the details filled by the user. */}
                        {/* {!resumeId
                        ?<div><h1>No resume</h1></div>
                        :dataStore.selectedTemplate.templateName === "Template 1"
                        ?<Template1  />
                        :dataStore.selectedTemplate.templateName === "Template 2"
                        ?<Template2  />
                        :dataStore.selectedTemplate.templateName === "Template 3"
                        ?<Template3  />
                        :<Template4  />} */}
    
    {/* </div>  */}
    <div className='container w-100 overflow-scroll'>
        <div  className=' row mt-2 p-5'>
            <div className='w-100 d-flex justify-content-center'>
                {/* <Link to="/detailsfillingpage/keyskills">
                    <button className='btn btn-primary me-4 p-2'> Go-Back</button>
                </Link> */}
                <button className='btn btn-success ms-3 p-2'onClick={downloadComponentPDF}>
                    Save PDF
                </button>
            </div>
        </div>
        <div  className='  mt-2 p-5 w-100 ' style={{ minWidth:"1200px", overflow:'scroll'}}>
            <div className=' w-100  d-flex justify-content-center '>
                <div className='w-100 ' >
                    <div id='divToPrint' className='w-100'>
                        {/* In this div, user selected template is rendered alongwith the details filled by the user. */}
                        {!resumeId
                        ?<div><h1>No resume</h1></div>
                        :selectedTemplate.templateName === "Template 1"
                        ?<Template1  />
                        :selectedTemplate.templateName === "Template 2"
                        ?<Template2  />
                        :selectedTemplate.templateName === "Template 3"
                        ?<Template3  />
                        :<Template4  />} 
                    </div>
                </div>

            </div>
           
            
            {/* this SuccessMessage component displays modal popup on the screen with the message 'Your resume has been successfully downloaded'. */}
            <div><SuccessMessage showModal={showModal} setShowModal={setShowModal}/></div>

        </div>
        </div>
        </>
  )
}
