import { PostsActionType } from "./types";

const {
    POST_LOADED_SUCCESS,
    POST_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST_BY_ID,
} = PostsActionType;

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
    postDetail: Post;
}

type PostAction =
    | {
          type: typeof POST_LOADED_SUCCESS;
          payload: Post[];
      }
    | {
          type: typeof POST_LOADED_FAIL;
          payload: Post[];
      }
    | {
          type: typeof ADD_POST;
          payload: Post;
      }
    | {
          type: typeof DELETE_POST;
          payload: any;
      }
    | {
          type: typeof FIND_POST_BY_ID;
          payload: any;
      }
    | {
          type: typeof UPDATE_POST;
          payload: Post;
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
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
            };
        case FIND_POST_BY_ID:
            return { ...state, postDetail: action.payload };
        case UPDATE_POST:
            const newPosts = state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                } else {
                    return post;
                }
            });
            return {
                ...state,
                posts: newPosts,
            };
        default:
            return state;
    }
    return state;
};
