import { useState, useEffect } from "react";
import React from 'react';
import formStyles from '../styles/Form.module.css'
import { useAuthContext } from "../hooks/useAuthContext";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";

const Register = () => {
    const {register, error} = useRegister()
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
                ...prevState,
                [name]: value
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await register(form)
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
                <div className={formStyles.btncont}>
                    <button onClick={onSubmit}>Register</button>
                </div>
                <div className={formStyles.linkcont}>
                    Already a user? <Link to={'/login'}><strong>Sign in</strong></Link>
                </div>
                {error ? <div className={formStyles.errorcont}><p>{error}</p></div> : null }
            </form>
        </div>
    );
}

export default Register;
