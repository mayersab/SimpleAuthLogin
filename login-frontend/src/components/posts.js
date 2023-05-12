import React from 'react';
import postStyles from '../styles/Posts.module.css'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';
import { useState, useEffect } from 'react';

const Posts = ({message, date, postedBy, id}) => {
    const todaysDate = new Date(date).toLocaleDateString()
    const {user} = useAuthContext()
    const {state, dispatch} = usePostsContext()
    const [error, seterror] = useState(null);
    useEffect(() => {

    }, [state]);
    const deletePosts = async () => {

        try {
            const res = await fetch(`/messages/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            const json = await res.json()
    
            if(res.ok) {
                dispatch({type: 'DELETE', action: json})
            }
        } catch (error) {
            seterror(error)
        }

    }



    return (
        <div>
            <div className={postStyles.card}>
                <div>
                    <div>
                        <p>{todaysDate}</p>
                    </div>
                    <div>
                        <p>{message}</p>
                    </div>
                    <div>
                        <p>Posted by: {postedBy}</p>
                    </div>
                </div>
                <div>
                    <Link to={`/${id}`}><button>Edit</button></Link>
                    <button onClick={() => {
                        if (postedBy === user.username) {
                            deletePosts()
                        } else {
                            alert('No')
                        }
                    }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Posts;
