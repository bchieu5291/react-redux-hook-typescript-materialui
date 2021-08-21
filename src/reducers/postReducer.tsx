import { PostsActionType } from "./types";

const { POST_LOADED_SUCCESS, POST_LOADED_FAIL } = PostsActionType;

export interface Post {
    _id: string;
    title: string;
    description: string;
    url: string;
    status: string;
}

export interface PostState {
    posts: Post[];
    postsLoading: boolean;
}

type PostAction =
    | {
          type: typeof POST_LOADED_SUCCESS;
          payload: Post[];
      }
    | {
          type: typeof POST_LOADED_FAIL;
          payload: Post[];
      };

export const postReducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
        case POST_LOADED_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                postsLoading: false,
            };
        case POST_LOADED_FAIL:
            return {
                ...state,
                posts: [],
                postsLoading: false,
            };
        default:
            return state;
    }
    return state;
};
