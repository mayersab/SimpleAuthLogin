import {useAuthContext} from './useAuthContext'
import React from 'react';
import { useState } from 'react';

const useLogin = () => {
    const [error, seterror] = useState(null);
    const {dispatch} = useAuthContext

    const login = async (form) => {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const json = await res.json()

        if (!res.ok) {
            seterror(res.error)
        }
        if (res.ok) {
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return {login}
}

export default useLogin;
