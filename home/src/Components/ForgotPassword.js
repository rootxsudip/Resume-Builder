import React, { useState } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import './ForgotPassword.css';
import axios from '../api/axios';


const ForgotPassword = () => {

    
    const [queryParameters] = useSearchParams()
    const [password, setNewPassword] = useState('');
    const [confirmPass, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const token = queryParameters.get("token")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPass) {
            setMessage('New password and confirm password do not match.');
            return;
        }
        try{
            const response = await axios.post(`http://localhost:8080/auth/forgot-password/reset?token=${token}`,
            JSON.stringify({email,password,confirmPass}),
                {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
            setMessage('Password changed successfully!');
            setNewPassword('');
            setConfirmPassword('');
            setEmail('')
        }catch(err){
            if(!err?.response){
                console.log('No Server Response');
            }else if(err.response?.status === 403){
                console.log('Unauthorized');
            }else{
                setMessage('Forgot password req failed');
            }
        }
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`http://localhost:8080/auth/forgot-password`,
                JSON.stringify({email}),
                {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
            setMessage('Sent mail successfully!');
            setEmail('')
        }catch(err){
            if(!err?.response){
                console.log('No Server Response');
            }else if(err.response?.status === 403){
                console.log('Unauthorized');
            }else{
                setMessage('Forgot password req failed');
            }
        }
    };

    return (
        <div className="password-change-container">
            <div className="password-change">
                <h1>Forgot Password</h1>
                {token ?(
                <form onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPass}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
                ):(
                    <form onSubmit={sendEmail}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                )}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;