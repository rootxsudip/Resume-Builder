import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './ResetPassword.css';
import axios from 'axios';

const ResetPassword = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [oldPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // const handleUpdatePassword = () => {
    //     if (newPassword !== confirmPassword) {
    //         setError('New password and confirm password do not match.');
    //         return;
    //     }
    //     // Proceed to the actual change password page
    //     navigate('/change-password', { state: { currentPassword, newPassword } });
    // };

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            //         setError('New password and confirm password do not match.');
            //         return;
            }
        try{
            const response = await axios.put("http://localhost:8080/api/users/profile/password",
                JSON.stringify({oldPassword,newPassword}),
                {
                    headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                    }
                });
                console.log(JSON.stringify(response?.data));

                // setAuth({...auth,email});
                // setProfile({...profile,email,fullName});
                // setEmail('')
                // setName('')
                setConfirmPassword('')
                setCurrentPassword('')
                setNewPassword('')
                navigate("/logout")
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

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <div className="password-field">
                <label>Current Password:</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="password-field">
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="password-field">
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
    );
};

export default ResetPassword;