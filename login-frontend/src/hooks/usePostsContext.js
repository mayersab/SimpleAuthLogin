import React from 'react';
import { useContext } from 'react';
import { PostContext } from '../context/postContext';

export const usePostsContext = () => {
    const context = useContext(PostContext)

    if (!context) {
        throw Error('Must be wrapped in post context')
    }

    return context
}


