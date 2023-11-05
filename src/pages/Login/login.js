import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginAs, setLoginAs] = useState('patient');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
            loginAs,
        };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();

                // Save the token and userId in localStorage
                localStorage.setItem('token', data.token);

                // Redirect to the appropriate dashboard based on loginAs
                if (loginAs === 'doctor') {
                    navigate('/doctor');
                } else {
                    navigate('/home');
                }
            } else {
                alert('Login Failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="login-container">
                        <h2>Login</h2>
                        <form id="loginForm">
                            <div className="form-group">
                                <label htmlFor="email">Email ID</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                Login As:<br />
                                <input
                                    type="radio"
                                    id="patient"
                                    name="loginAs"
                                    value="patient"
                                    checked={loginAs === 'patient'}
                                    onChange={() => setLoginAs('patient')}
                                />
                                <label htmlFor="patient">Patient</label><br />
                                <input
                                    type="radio"
                                    id="doctor"
                                    name="loginAs"
                                    value="doctor"
                                    checked={loginAs === 'doctor'}
                                    onChange={() => setLoginAs('doctor')}
                                />
                                <label htmlFor="doctor">Doctor</label><br />
                            </div>
                            <a href="/signup">Don't have an account? Sign Up</a>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
