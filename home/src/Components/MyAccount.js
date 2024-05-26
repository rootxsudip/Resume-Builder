import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import './MyAccount.css';
import { useProfile } from '../context/ProfileContext';
import { useSubscription } from '../context/SubscriptionContext';

const UPLOAD_URL = 'http://localhost:8080/api/users/profile/image';
const DELETE_URL = 'http://localhost:8080/api/users/profile/image';
const PROFILE_URL = 'http://localhost:8080/api/users/profile';

const MyAccount = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const {profile,setProfile} = useProfile();
    const {subscription} = useSubscription();

    const [isEditing, setIsEditing] = useState(false);
    // const [editedDetails, setEditedDetails] = useState({ ...auth });
    const [email, setEmail] = useState("");
    const [fullName, setName] = useState("");

    const [uploadStatus, setUploadStatus] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = () => {
        // const { name, value } = e.target;
        // console.log(e.target)
        // setEditedDetails({
        //     ...editedDetails,
        //     [name]: value
        // });
        // setName(value)
    };

    const handleSaveClick = async () => {
        try{
            const response = await axios.put(PROFILE_URL,
                JSON.stringify({email,fullName}),
                {
                    headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                    }
                });
                console.log(JSON.stringify(response?.data));

                if(profile.email != email){
                    navigate("/logout")
                }
                setAuth({...auth,email});
                setProfile({...profile,email,fullName});
                setEmail('')
                setName('')
                setIsEditing(false);
        }catch(err){
            if(!err?.response){
                console.log('No Server Response');
            }else if(err.response?.status === 403){
                console.log('Unauthorized');
            }else{
                console.log('Profile update Failed');
            }
        }
    };

    const handleUploadClick = () => {
        document.getElementById('file-input').click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(UPLOAD_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setProfile((profile) => ({
                    ...profile,
                    profile_pic: response.data,
                }));
                setUploadStatus('Image uploaded successfully!');
            } else {
                setUploadStatus('Failed to upload image.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setUploadStatus('Failed to upload image.');
        }
    };

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(DELETE_URL, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
            });

                setUploadStatus('Image deleted successfully!');
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    profileImage: null,
                }));
        } catch (err) {
            console.error('Delete error:', err);
            setUploadStatus('Failed to delete image.');
        }
        setProfile((profile) => ({
            ...profile,
            profile_pic: "",
        }));
    };

    return (
        <div className="my-account-container">
            <div className="user-icon-container">
                <img
                    // src={auth.auth.profile_pic || "/avatar.jpg"}
                    src={profile.profile_pic || "/avatar.jpg"}
                    alt="User Icon"
                    className="user-icon"
                    onError={(e) => { e.target.onerror = null; e.target.src = "/avatar.jpg"; }}
                />
            </div>
            <div className="icon-options">
                <button className="icon-button" onClick={handleUploadClick}>
                    Upload Picture
                </button>
                <button className="icon-button" onClick={handleDeleteClick}>
                    Delete Picture
                </button>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <p>{uploadStatus}</p>
            </div>
            <div className="account-details">
                <div className="account-header">
                    <h2>Account Details</h2>
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit
                    </button>
                </div>
                <div className="detail-item">
                    <label>Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    ) : (
                        <span>{profile.fullName}</span>
                    )}
                </div>
                <div className="detail-item">
                    <label>Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    ) : (
                        <span>{profile.email}</span>
                    )}
                </div>
                <div className="detail-item">
                    <label>Password:</label>
                    <span>********</span>
                    <Link to="/reset-password" className="change-password-link">
                        Change Password?
                    </Link>
                </div>
                {isEditing && (
                    <button className="save-button" onClick={handleSaveClick}>
                        Save
                    </button>
                )}
            </div>
            <div className="my-plan">
                <div className="plan-header">
                    <h2>My Plan</h2>
                </div>
                <div className="plan-detail">
                    <label>Plan: </label>
                    <span> {subscription.planType} </span>
                    <Link to="/pricing" className="pricing-link">
                        Upgrade Plan
                    </Link>
                </div>
                <div className="plan-detail">
                    <label>Status: </label>
                    <span> Active </span>
                </div>
                <div className="plan-detail">
                    <label>Expiration: </label>
                    <span> {subscription.endDate} </span>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;