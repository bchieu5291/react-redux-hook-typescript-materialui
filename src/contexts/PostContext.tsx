import axios from "axios";
import { createContext, ReactNode, useReducer } from "react";
import { postReducer, PostState } from "reducers/postReducer";
import { PostsActionType } from "reducers/types";
import { apiUrl } from "./../components/ultilities/constanst";

const { POST_LOADED_SUCCESS } = PostsActionType;

interface Props {
    children: ReactNode;
}

interface ContextDefault {
    postState: PostState;
    getPosts: () => void;
}

const defaultData: PostState = {
    posts: [],
    postsLoading: false,
};

export const PostContext = createContext<ContextDefault>({
    postState: defaultData,
    getPosts: () => {},
});

const PostContextProvider = ({ children }: Props) => {
    //reducer
    const [postState, dispatch] = useReducer(postReducer, defaultData);

    //get Posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //context data
    const postContextData = { postState, getPosts };

    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
