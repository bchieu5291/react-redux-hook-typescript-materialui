import { UserActionType } from './types'

const { USER_LOADED_SUCCESS, USER_LOADED_FAIL } = UserActionType

export interface IUser {
    _id: string
    username: string
    createAt: Date
}

export interface IUserReducerState {
    userlisting: IUser[]
    userListingLoading: boolean
    totalPages: number
    currentPage: number
    total: number
}

type UserAction =
    | {
          type: typeof USER_LOADED_SUCCESS
          payload: {
              data: IUser[]
              totalPages: number
              currentPage: number
              total: number
          }
      }
    | {
          type: typeof USER_LOADED_FAIL
          payload: IUser[]
      }

export const userReducer = (state: IUserReducerState, action: UserAction) => {
    switch (action.type) {
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                userlisting: action.payload.data,
                userlistingLoading: false,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                total: action.payload.total,
            }
        default:
            return state
    }
    return state
}
