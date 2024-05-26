import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template3() {
    const dataStore = useSelector(state => state.dataStore)
  return (
    <div className='w-100' style={{border:"1px solid #4b6982",backgroundColor:"#f7eebb"}}>
        <div className='row m-0'>
            <div className='col col-3 d-flex align-items-center pt-5' style={{backgroundColor:"#583131", flexDirection:"column"}}>
                <div className=" media me-5" >
                    <img className="rounded align-self-center  " src={ dataStore.imageFile} alt='profile-pic'
                        style={{maxHeight:'180px',minHeight:"100px", width:'100px', background:'grey',padding:0}}/>
                </div>
                <div className=" mt-3 font-weight-bold " style={{fontFamily:"Serif",}}>
                    <div className='' style={{color:"white",fontSize:"30px"}}>{ dataStore.personalInfo.firstName +" "+  dataStore.personalInfo.lastName}</div>
                    <h5 className='pt-2 'style={{color:"#adccc7", fontSize:"20px"}}>{dataStore.workEx[dataStore.workEx.length -1].title}</h5>
                </div>
                <div className=" ">
                    <div className='p-5 ms-4' style={{fontSize:"18px",display:"inline-block"}}>
                        <div className=" px-2 mb-2 " style={{backgroundColor:'white', color:"black"}}>Email:</div>
                        <div style={{color:'#f7f7f7'}}>{dataStore.personalInfo.email}</div>
                        <div className=" px-2 mb-2 mt-2" style={{backgroundColor:'white', color:"black"}}>Contact:</div>
                        <div style={{color:'#f7f7f7'}}>{dataStore.personalInfo.mobile}</div>
                        <div className=" px-2 mb-2 mt-2 " style={{backgroundColor:'white', color:"black"}}>Address:</div>
                        <div style={{color:'#f7f7f7'}}>{dataStore.personalInfo.address1 +", "+ dataStore.personalInfo.address2
                                +",  "+dataStore.personalInfo.city+", "+ dataStore.personalInfo.state +", "+ dataStore.personalInfo.pin}
                        </div>
                    </div>
                </div>
            </div>
            <div className='col col-9'>
                <div>
                    <div className="text-justify mt-4">{dataStore.personalInfo.objective}</div>
                    <hr style={{height:"5px",backgroundColor:"#4b6982"}}/> 
                </div>
                <div className="" style={{fontFamily:"Serif",}}>
                    <div className="">
                    <div className=" text-left bg-light mb-4 " style={{color:"#4b6982"}}> <h3><b>Professional Experience</b> </h3></div>
                    <div className=" text-left " style={{fontSize:"18px"}}>
                        {dataStore.workEx.map((item)=>{
                            return(
                                    <div key={shortid.generate()}>
                                        <div className='mt-2'><h4>{item.orgName}</h4></div>
                                        <div className='mt-2'><b>{item.title}</b></div>
                                        
                                        <div className='mt-2 mb-3'>
                                            <div>Worked in {item.orgName} from {item.startYear} to {item.endYear}.</div>
                                            <div>{item.jobDescription}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-100 mt-4"> </div>
                    <hr style={{height:"5px",backgroundColor:"#4b6982"}}/>
                    <div className="bg-light text-left" style={{color:"#4b6982"}}><h3><b>Education</b></h3></div>
                    <div className=" text-left" >
                        <div style={{fontSize:"18px"}}>
                            {dataStore.education.map((item)=>{
                                return(
                                        <div key={shortid.generate()}>
                                            <h5> {item.degree}</h5>
                                            <div> I have persued my {item.type} <b> from {item.university}</b> </div>
                                            <p>Duration: {" "+item.start+ " - " + item.end}</p> 
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-100 mt-4"> </div>
                    <hr style={{height:"5px",backgroundColor:"#4b6982"}}/>
                    <div className="bg-light text-left " >
                        <h3 style={{color:"#4b6982"}}><b>Key Skills</b></h3>
                    </div>
                    <div className=" text-left mb-4" style={{fontSize:"18px"}}>
                            {dataStore.skills.map((skill)=>{
                                return(
                                        <div key={shortid.generate()}><li>{skill.skillName}</li></div>
                                    )
                                })
                            }
                    </div>
                    </div>
                </div>
            </div>
           
        </div>
      
    </div>
  )
}

export default Template3
