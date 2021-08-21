import { AuthActionType } from "./types";

const { TOGGLE_AUTH, SET_AUTH } = AuthActionType;

export interface AuthState {
    authLoading: boolean;
    isAuthenticated: boolean;
    user: any;
}

type AuthAction =
    | {
          type: typeof TOGGLE_AUTH;
          payload: string;
      }
    | {
          type: typeof SET_AUTH;
          payload: AuthState;
      };

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case TOGGLE_AUTH:
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated,
                username: action.payload,
            };
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
            };
        default:
            return state;
    }
    return state;
};
