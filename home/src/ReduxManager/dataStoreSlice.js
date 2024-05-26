import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  id:"",
        personalInfo:{
                firstName:"",
                lastName:"",
                email:"",
                mobile:"",
                address1:"",
                address2:"",
                city:"",
                state:"",
                pin:"",
                objective:""
        },
        workEx: [
                {
                    title:"",
                    orgName:"",
                    startYear:"",
                    endYear:"",
                    jobDescription:"",
                }
        ],
        education:[
          {
                type:"Graduation",
                university:"",
                degree:"",
                start:"",
                end:""
        }],
        skills:[
          {skillName:""}
        ] ,
        selectedTemplate:"",
        imageFile:null,
        errorMessages:{},
        showErrorMessages:false,
}

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: initialState,
  reducers: {
    
    updatePersonalInfo: (state,action) => { 
      //this function updates the targeted key of the personalInfo element of dataStore //
        state.personalInfo[action.payload.key] =action.payload.value
    },

    updateWorkEx: (state,action) =>{
      //this function updates the targeted key of the workEx element of dataStore //
        state.workEx[action.payload.index][action.payload.key] = action.payload.value
    },
    updateEducation: (state,action) =>{
      //this function updates the targeted key of the education element of dataStore //
      state.education[action.payload.index][action.payload.key] = action.payload.value
    },

    updateSkills: (state, action) => {
      state.skills = action.payload;
   },

    updateWorkExperience: (state, action) => {
      state.workEx = action.payload;
   },

    updateEdu: (state, action) => {
      state.education = action.payload;
   },

    updateKeySkills: (state,action) =>{
      //this function updates the targeted key of the keySkills element of dataStore //
      state.skills[action.payload.index][action.payload.key] = action.payload.value
    },
    updateState: (state,action) =>{
      //this function can be called to update any targeted element of dataStore //
      state[action.payload.key]=action.payload.value
    },
    updateErrorMessages: (state,action) =>{
      //this function updates errorMessages element of dataStore //
      let key = action.payload.key
      if(action.payload.index){
        key+='_'+action.payload.index
      }
      state.errorMessages[key]=action.payload.value
    },
    addArrayElement:(state,action) =>{
      //this function is used to push a blank object in the array of elements(workEx,education& keySkills)
      //when the user clicks on the Add-new button to add more related details//
      state[action.payload.key].push(action.payload.element)
    },
    removeArrayElement:(state,action) =>{
      //this function deletes the latest saved details in the array of elements(workEx,education& keySkills), when the user clicks on the remove button// 
      state[action.payload.key].pop()
    },
    resetState: () =>{
      return initialState
    }
  }
})

export const { updatePersonalInfo, updateWorkEx, updateWorkExperience, updateEdu, updateEducation, updateKeySkills,updateSkills,
  updateErrorMessages, updateState, addArrayElement, removeArrayElement,resetState } = dataStoreSlice.actions

export default dataStoreSlice.reducer