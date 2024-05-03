import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';
import Feedbacks from '../../component/Feedback';

export default function MfaLogin() {
    const [codeValidation, setCodeValidation] = useState(new Array(6).fill(''));
    const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMess] = useState({ mess: '', color: 'success' });

    const setMessage = (mess:any, color:any) => setMess({ mess, color });
    const close = () => setOpen(false);

    // Combine user info and token retrieval into a more secure approach
    const getUserInfos = async () => {
        const token = Cookies.get('Token'); // Retrieve the token directly
        if (!token) {
            console.error('No token found');
            return;
        }
        await axios.get(`${config.apiUrl}/user_info`, { // This endpoint should be adjusted to your actual endpoint
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const { first_name, phone_number } = response.data;
            if (first_name && phone_number) navigate('/accueil');
            else navigate('/info');
        }).catch((e) => {
            console.error('Error retrieving user info:', e);
            throw e;
        });
    };

const handleCodeInput = (index:any, value:any) => {
    const newCodeValidation = [...codeValidation];
    newCodeValidation[index] = value;
    setCodeValidation(newCodeValidation);

    // Automatically move to the next input field after a character is input
    if (value && index < codeValidation.length - 1) {
        inputRefs.current[index + 1].current?.focus();
    }
};


    const handleVerifyCode = async () => {
        const token = Cookies.get('Token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await axios.post(`${config.apiUrl}/verify_mfa`, { mfa_code: codeValidation.join('') }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Verification succeeded!', 'success');
            getUserInfos();
        } catch (e) {
            setOpen(true);
            setCodeValidation(Array(6).fill(''));
            setMessage('Incorrect code or error occurred', 'error');
            console.error('Verification failed:', e);
        }
    };

    return (
        <section className="login-container">
            <div className="login-text" id="login-text">
                <h2>voron</h2>
                <h1>In efficiency we trust</h1>
            </div>
            <div className="login-form" id="login-form">
                <div className="wrapper">
                    <div className="form-wrapper">
                        <h2>Double authentication check</h2>
                        <p>Please enter the verification code sent to your email.</p>
                        <div className="mfa-code-input" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            {codeValidation.map((value, index) => (
                                <input key={index} type="text" maxLength={1} value={value}
                                    onChange={e => handleCodeInput(index, e.target.value)}
                                    ref={inputRefs.current[index]}
                                    style={{ width: '30px', height: '30px', marginRight: '10px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }} />
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                            <button onClick={handleVerifyCode} type="button" className="form-control cursor-pointer">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {open && <Feedbacks mess={message.mess} color={message.color} close={close} open={open} />}
        </section>
    );
}
