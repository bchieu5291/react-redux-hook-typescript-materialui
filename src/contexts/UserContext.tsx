import axios from 'axios'
import { createContext, ReactNode, useReducer, useState } from 'react'
import { postReducer, PostState } from 'reducers/postReducer'
import { PostsActionType, UserActionType } from 'reducers/types'
import { IToast } from 'model/AuthForm'
import { apiUrl } from '../ultilities/constanst'
import { Post } from './../reducers/postReducer'
import { IUser, IUserReducerState } from 'reducers/UserReducer'
import { userReducer } from './../reducers/UserReducer'

const { USER_LOADED_SUCCESS } = UserActionType

interface Props {
    children: ReactNode
}

interface ContextDefault {
    userState: IUserReducerState
    getUsers: () => void
}
const defaultData: IUserReducerState = {
    userlisting: [],
    userListingLoading: false,
    totalPages: 0,
    currentPage: 0,
    total: 0,
}

export const UserContext = createContext<ContextDefault>({
    userState: defaultData,
    getUsers: () => {},
})

const UserContextProvider = ({ children }: Props) => {
    //reducer
    const [userState, dispatch] = useReducer(userReducer, defaultData)

    //get Posts
    const getUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users`)
            if (response.data.success) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: response.data,
                })
            }
        } catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    //context data
    const userContextData = {
        userState,
        getUsers,
    }

    return <UserContext.Provider value={userContextData}>{children}</UserContext.Provider>
}

export default UserContextProvider
