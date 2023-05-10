import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate, useParams } from 'react-router';
import { usePostsContext } from '../hooks/usePostsContext';


const NewPost = () => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null);
    const [navigate, setnavigate] = useState(false);
    const [state, setState] = useState({
        message: '',
        postedBy: user.username
    });



    const createPost = async () => {

        try {
            const res = await fetch('/messages/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(state)
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



    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setState((prevState) => {
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
                       <input type="text" name='message' value={state.message} onChange={handleChange}/>
                    </div>
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            createPost()
                        }}>Submit</button>
                        <div>{error && <p>{error}</p>}</div>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default NewPost;
