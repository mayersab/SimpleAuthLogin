import React from 'react';
import { useEffect, useState } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Posts from '../components/posts';
import { Link } from 'react-router-dom';
import homeStyles from '../styles/Home.module.css'

const Home = () => {

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


     
    }, [posts]);

    return (
        <div>

            <div className={homeStyles.linkwrapper}>
                <Link to={'/create'}>Create a Post</Link>
                <Link onClick={logout} to={'/login'}>Logout</Link>
            </div>
            
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
