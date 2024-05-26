import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { updateState} from '../../../ReduxManager/dataStoreSlice'
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

function App() {
    const { auth } = useAuth(); 

    const imageFile= useSelector(state=> state.dataStore.imageFile)
    const dispatch = useDispatch();
    
    const  handleChange = async (e) => {
        //this function is used to update 'imageFile' in dataStoreSlice with the user given input ,
        //which will be reflected in personalInfo as the profile image.
        let file = e.target.files[0]
        const  fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        if (validImageTypes.includes(fileType)) {
            
            const formData = new FormData();
            formData.append('image', file);

            try {
            const response = await axios.post('http://localhost:8080/api/users/resume/image', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${auth.accessToken}`
                }
            });
            // let temp=URL.createObjectURL(file)
            dispatch(updateState({
                key:'imageFile',
                value:response.data,
            }))
            } catch (error) {
            console.error('Error uploading file:', error);
            }
        }
        else{
            alert('Uploaded file type should be jpg/png!')
        }
    }
    return (
        <div className="container">
    
            <div className="row">
                <img style={{height:'150px', width:'100px', background:'grey',padding:0}} src={imageFile} alt='profile'/>
            </div>
            <div className="row">
                <input type="file" onChange={handleChange} />
            </div>
            
  
        </div>
    );
} 
export default App;