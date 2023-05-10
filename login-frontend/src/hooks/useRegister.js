import {useAuthContext} from './useAuthContext'
import React from 'react';
import { useState } from 'react';

const useRegister = () => {
    const [error, seterror] = useState(null);
    const {dispatch} = useAuthContext()

    const register = async (form) => {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const json = await res.json()

        if (!res.ok) {
            seterror(json.error)
        }
        if (res.ok) {
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return {register, error}
}

export default useRegister;
