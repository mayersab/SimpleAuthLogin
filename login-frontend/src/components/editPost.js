import React from 'react';
import { useParams, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const EditPost = () => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null);
    const [navigate, setnavigate] = useState(false);
    const {id} = useParams()
    const [edit, setedit] = useState({});

    useEffect(() => {
        if (id) {
            // Make get req to get message 
            const getMsg = async () => {
                const res = await fetch(`/messages/${id}`)
                const json = await res.json()

                if (res.ok) {
                    setedit({
                        message: json.message,
                        postedBy: json.postedBy
                    })
                }
            }
            getMsg()
        }

        
    }, []);

    const editPost = async () => {

        try {
            const res = await fetch(`/messages/edit/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(edit)
            })

            if (!res.ok) {
                throw Error('Request Failed')
            }

            const json = await res.json()
            setnavigate(true)

        } catch (error) {
            setError(error.message)
        }
    }

    const handleEdit = (e) => {
        const name = e.target.name
        const value = e.target.value
        setedit((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    if (navigate) {
        return <Navigate to={'/'}/>
    }

    return (
        <div>
            <form>
                <div>
                    <div>
                        <label htmlFor="message">Message</label>
                    </div>
                    <div>
                        <input type="text" name='message' value={edit.message} onChange={handleEdit}/>
                    </div>
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            editPost()
                        }}>Re-Submit</button> 
                        <div>{error && <p>{error}</p>}</div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
