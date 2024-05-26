import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template2() {
    const dataStore = useSelector(state => state.dataStore)
  return (
    <div className="w-100 " style={{border:"5px solid #f0bebe", backgroundColor:"#fffeec"}}>
        <div >
            <div className="row m-0 d-flex align-items-center" style={{height:"200px",backgroundColor:"#f0bebe"}}>
                <div className="col-2 text-center media" >
                    <img className="rounded align-self-center mx-auto " src={ dataStore.imageFile} alt='profile-pic'
                         style={{maxHeight:'180px',minHeight:"120px", width:'100px', background:'grey',padding:0}}/>
                   
                </div>
                <div className="col-6 font-weight-bold " style={{fontFamily:"Serif"}}>
                    <div className=' d-flex justify-content-center'  style={{color:"white",fontSize:"55px"}}>{ dataStore.personalInfo.firstName +" "+  dataStore.personalInfo.lastName}</div>
                    <h5 className=' d-flex justify-content-center'>{dataStore.workEx[dataStore.workEx.length -1].title}</h5>
                </div>
                <div className="col-4  ">
                    <div className=' p-3' style={{fontSize:"18px",float:"left",display:"inline-block"}}>
                        <div >{dataStore.personalInfo.email}</div>
                        <div>{dataStore.personalInfo.mobile}</div>
                        <div>{dataStore.personalInfo.address1 +", "+ dataStore.personalInfo.address2
                                +",  "+dataStore.personalInfo.city+", "+ dataStore.personalInfo.state +", "+ dataStore.personalInfo.pin}
                        </div>
                        
                
                    </div>
                </div>
            </div>
        </div>
        <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>
        <div className="text-justify mx-4">{dataStore.personalInfo.objective}</div>
        <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>

        <div className="container" style={{fontFamily:"Serif",}}>
            <div className="row">
                <div className="col-3 text-left  " style={{color:"#de5b7b"}}> <h3> Professional Experience</h3></div>
                <div className="col-9  text-left " style={{fontSize:"18px"}}>
                    {dataStore.workEx.map((item)=>{
                        return(
                            <div key={shortid.generate()}>
                                <div className='mt-2'><b>{item.title}</b></div>
                                
                                
                                <div className='mt-2'>
                                    Worked in {item.orgName} from {item.startYear} to {item.endYear}.
                                </div>
                                <div>{item.jobDescription}</div>
                            </div>
                        )
                    })
                    }
                
                </div>
                <div className="w-100 mt-4"> </div>
                <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>
                <div className="col-3 text-left" style={{color:"#de5b7b"}}><h3>Education</h3></div>
                <div className="col-9 text-left" >
                    <div style={{fontSize:"18px"}}>
                        {dataStore.education.map((item)=>{
                            return(
                                <div key={shortid.generate()}>
                                    <b> {item.degree}</b>
                                    <div> I have persued my {item.type} in {item.degree} from {item.university}</div>
                                    <p>Duration: {" "+item.start+ " - " + item.end}</p> 
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
                <div className="w-100 mt-4 "> </div>
                <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>
                <div className="col-3 text-left mb-3 " >
                    <h3 style={{color:"#de5b7b"}}>Key Skills</h3>
                </div>
                <div className="col-9 text-left mb-3" style={{fontSize:"18px"}}>
                    
                        {dataStore.skills.map((skill)=>{
                            return(
                                <div key={shortid.generate()}>
                                    <li style={{listStyle:"none"}}>{skill.skillName}</li>
                                </div>
                            )
                             
                        })}
                </div>
                   
                </div>
        </div>
    </div>
                
    
  )
}

export default Template2
