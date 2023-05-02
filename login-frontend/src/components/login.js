import { useState, useEffect } from "react";
import React from 'react';
import formStyles from '../styles/Form.module.css'

const Login = () => {
    const [form, setform] = useState({
        username: '',
        email: '',
        password: '',
        confirm: ''
    });

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setform((prevState) => {
            return {
                ...form,
                [name]: value
            }
        })
    }

    useEffect(() => {
        console.log(form)
    }, [form]);

    return (
        <div className={formStyles.form}>
            <form action="">
                <div>
                    <div>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div>
                        <input type="text" name="username" value={form.username} onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <input type="text" name="email" value={form.email} onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input type="text" name="password" value={form.password} onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="confirm">Confirm</label>
                    </div>
                    <div>
                        <input type="text" name="confirm" value={form.confirm} onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <button>Send</button>
                </div>
                <div>
                    Already a user? <strong>Sign in</strong>
                </div>
            </form>
        </div>
    );
}

export default Login;
