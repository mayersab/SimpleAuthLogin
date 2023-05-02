import {useContext} from 'react'
import { AuthContext } from '../context/authContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('Component must be wrapped in context')
    }

    return context
}