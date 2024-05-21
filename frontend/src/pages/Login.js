import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import { Container, Form, Button, Alert } from 'react-bootstrap';
import styles from './Login.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

// Login Page
const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, error, isLoading } = useLogin();
    const { logout } = useLogout();
    const { admin } = useAuthContext();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        await login(username, password);
    }
    return (
        <div className='d-flex justify-content-center'>
            <div className="col-3 border shadow p-5">
                {admin && (
                    <div onClick={logout}>
                        <Button>Logout</Button>
                    </div>
                )}
                <div className={`${styles.title} row`}>
                    <h2 className="mb-4">CMS Admin Login</h2> {/* Form title */}
                </div>
                {admin ? (
                    <p>{`You are logged in as ${JSON.parse(localStorage.getItem('admin')).username}`}</p>
                ) : (
                    <p>If you're not an admin, you've come to the wrong place</p>
                )
                }
                <Form onSubmit={submitForm}>

                    <Form.Group controlId="formBasicUsername" className='my-2'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            value={username} 
                            onChange={handleUsernameChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            required 
                        />
                    </Form.Group>

                    <div className="row">
                        <Button type="submit" className={`${styles.loginButton} mt-1 mx-auto`}>
                                {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </div>
                </Form>
                {error && (
                    <p style={{ color: 'red', textAlign: 'left', 'font-size': '12px' }}>{error}</p>)
                    }         
            </div>
        </div>
    );
};

export default Login;