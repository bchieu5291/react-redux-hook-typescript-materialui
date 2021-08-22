import axios from "axios";
import { createContext, ReactNode, useReducer, useState } from "react";
import { postReducer, PostState } from "reducers/postReducer";
import { PostsActionType } from "reducers/types";
import { apiUrl } from "./../components/ultilities/constanst";
import { Post } from "./../reducers/postReducer";

const { POST_LOADED_SUCCESS, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST_BY_ID } =
    PostsActionType;

interface Props {
    children: ReactNode;
}

export interface IToast {
    show: boolean;
    message: string;
    type: any;
}

interface ContextDefault {
    postState: PostState;
    getPosts: () => void;
    showAddPostModal: boolean;
    setShowAddPostModal: (showAddPostModal: boolean) => void;
    showToast: IToast;
    setShowToast: (toast: IToast) => void;
    addPost: (newPost: Post) => any;
    findPost: (postId: string) => any;
    updatePost: (updatedPost: Post) => any;
    deletePost: (postId: string) => any;
    showUpdatePostModal: boolean;
    setShowUpdatePostModal: (showUpdatePostModal: boolean) => void;
}

const defaultPostData: Post = {
    _id: "",
    title: "",
    description: "",
    url: "",
    status: "",
};

const defaultData: PostState = {
    postDetail: defaultPostData,
    posts: [] as Post[],
    postsLoading: false,
};

const defaultToastData: IToast = {
    show: false,
    message: "",
    type: null,
};

export const PostContext = createContext<ContextDefault>({
    postState: defaultData,
    getPosts: () => {},
    showAddPostModal: false,
    setShowAddPostModal: () => {},
    showToast: defaultToastData,
    setShowToast: () => {},
    addPost: () => {},
    findPost: () => {},
    updatePost: () => {},
    deletePost: () => {},
    showUpdatePostModal: false,
    setShowUpdatePostModal: () => {},
});

const PostContextProvider = ({ children }: Props) => {
    //reducer
    const [postState, dispatch] = useReducer(postReducer, defaultData);

    //state
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState<IToast>({
        show: true,
        message: "",
        type: null,
    });

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

    //add Posts
    const addPost = async (newPost: Post) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post,
                });

                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //delete Posts
    const deletePost = async (postId: string) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId,
                });

                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // Find post when user click on post and add it to Post Context
    const findPost = (postId: string) => {
        const post = postState.posts.find((item) => item._id == postId);
        dispatch({
            type: FIND_POST_BY_ID,
            payload: post,
        });
    };

    // update post
    const updatePost = async (updatedPost: Post) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });

                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        showToast,
        setShowToast,
        addPost,
        findPost,
        updatePost,
        deletePost,
        showUpdatePostModal,
        setShowUpdatePostModal,
    };

    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
