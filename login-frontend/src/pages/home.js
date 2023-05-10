import React from 'react';
import { useEffect, useState } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Posts from '../components/posts';
import homeStyles from '../styles/Home.module.css'

const Home = () => {
    // make api call map over results and render the card component
    // prop will need to figure out why proxy isnt working
    const {user, dispatch: authDispatch} = useAuthContext()
    const {posts, dispatch: postsDispatch} = usePostsContext()
    const [error, seterror] = useState(null);
    const logout = () => {
        localStorage.clear()
        authDispatch({type: 'LOGOUT'})
    }

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch('/messages/all')
            const json = await res.json()

            // if(!res.ok) {
            //     seterror(res.error)
            // }
            if (res.ok) {
                postsDispatch({type: 'GET_POSTS', payload: json})
                
            }
        }
        getPosts()
        console.log(user)


     
    }, []);

    return (
        <div>
            <button onClick={logout}>Logout</button>
            {
                posts && posts.map((item) => {
                    return (
                        <div key={item._id}>
                            <Posts
                                message={item.message}
                                date={item.date}
                                postedBy={item.postedBy}
                                id={item._id}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Home;
