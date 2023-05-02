import { createContext, useReducer } from "react";

export const PostContext = createContext()

export const postReducer = (state, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POSTS':
            return {
                posts: [action.payload, ...state]
            }
        case 'DELETE_POSTS':
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id)
            }
        default:
            return state
    }
}