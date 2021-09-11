import axios from "axios";
import { createContext, ReactNode, useReducer, useState } from "react";
import { postReducer, PostState } from "reducers/postReducer";
import { NewsActionType } from "reducers/types";
import { apiUrl } from "../ultilities/constanst";
import { Post } from "../reducers/postReducer";
import { IToast } from "model/AuthForm";
import { News, newsReducer, NewsReducerState } from "reducers/newsReducer";

const {
    NEWS_LOADED_SUCCESS,
    NEWS_LOADED_MORE_SUCCESS,
    ADD_NEWS,
    DELETE_NEWS,
    UPDATE_NEWS,
    FIND_NEWS_BY_ID,
} = NewsActionType;

interface Props {
    children: ReactNode;
}

interface ContextDefault {
    newsState: NewsReducerState;
    getNews: (
        title?: string,
        classifications?: string,
        page?: number,
        length?: number,
        isLoadMore?: boolean
    ) => void;
    addNews: (newNews: FormData) => any;
    showAddNewsModal: boolean;
    setShowAddNewsModal: (showAddNewsModal: boolean) => void;
    deleteNews: (newsId: string) => any;
    findNews: (newsId: string) => any;
    showUpdateNewsModal: boolean;
    setShowUpdateNewsModal: (showUpdateNewsModal: boolean) => void;
    updateNews: (news: FormData) => any;
}

const defaultPostData: News = {
    _id: "",
    title: "",
    description: "",
    url: "",
    createAt: new Date(),
    imageFile: {
        _id: "",
        imageUrl: "",
    },
    classifications: [],
};

const defaultData: NewsReducerState = {
    newsDetail: defaultPostData,
    newsListing: [],
    newsListingLoading: false,
    totalPages: 0,
    currentPage: 0,
    total: 0,
};

const defaultToastData: IToast = {
    show: false,
    message: "",
    type: null,
};

export const NewsContext = createContext<ContextDefault>({
    newsState: defaultData,
    getNews: () => {},
    addNews: () => {},
    showAddNewsModal: false,
    setShowAddNewsModal: () => {},
    deleteNews: () => {},
    findNews: () => {},
    showUpdateNewsModal: false,
    setShowUpdateNewsModal: () => {},
    updateNews: () => {},
});

const NewsContextProvider = ({ children }: Props) => {
    //reducer
    const [newsState, dispatch] = useReducer(newsReducer, defaultData);

    //state
    const [showAddNewsModal, setShowAddNewsModal] = useState(false);
    const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false);
    // const [showToast, setShowToast] = useState<IToast>({
    //     show: true,
    //     message: "",
    //     type: null,
    // });

    //get News
    const getNews = async (
        title?: string,
        classifications?: string,
        page?: number,
        length?: number,
        isLoadMore?: boolean
    ) => {
        try {
            const response = await axios.get(
                `${apiUrl}/news?title=${title ?? ""}&classifications=${
                    classifications ?? []
                }&page=${page ?? 0}&length=${length ?? 0}`
            );
            if (response.data.success) {
                if (!isLoadMore) {
                    dispatch({
                        type: NEWS_LOADED_SUCCESS,
                        payload: {
                            newsListing: response.data.news.docs,
                            totalPages: response.data.news.totalPages,
                            currentPage: response.data.news.page,
                            total: response.data.news.totalDocs,
                        },
                    });
                } else {
                    dispatch({
                        type: NEWS_LOADED_MORE_SUCCESS,
                        payload: {
                            newsListing: response.data.news.docs,
                            totalPages: response.data.news.totalPages,
                            currentPage: response.data.news.page,
                            total: response.data.news.totalDocs,
                        },
                    });
                }
            }
        } catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //add News
    const addNews = async (newNews: FormData) => {
        try {
            axios({
                method: "post",
                url: `${apiUrl}/news`,
                data: newNews,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                //handle success
                if (response.data.success) {
                    dispatch({
                        type: ADD_NEWS,
                        payload: response.data.news,
                    });

                    return response.data;
                }
            });
        } catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // Find post when user click on post and add it to Post Context
    const findNews = (newsId: string) => {
        const news = newsState.newsListing.find((item) => item._id == newsId);
        dispatch({
            type: FIND_NEWS_BY_ID,
            payload: news as News,
        });
    };

    // update news
    const updateNews = async (updatedNews: FormData) => {
        try {
            const url = `${apiUrl}/news/${newsState.newsDetail._id}`;
            axios({
                method: "put",
                url: url,
                data: updatedNews,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                //handle success
                if (response.data.success) {
                    dispatch({
                        type: UPDATE_NEWS,
                        payload: response.data.news,
                    });

                    return response.data;
                }
            });
        } catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //delete Posts
    const deleteNews = async (newsId: string) => {
        try {
            const response = await axios.delete(`${apiUrl}/news/${newsId}`);
            if (response.data.success) {
                dispatch({
                    type: DELETE_NEWS,
                    payload: newsId,
                });

                return response.data;
            }
        } catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //context data
    const newsContextData = {
        newsState,
        getNews,
        addNews,
        showAddNewsModal,
        setShowAddNewsModal,
        deleteNews,
        findNews,
        showUpdateNewsModal,
        setShowUpdateNewsModal,
        updateNews,
    };

    return <NewsContext.Provider value={newsContextData}>{children}</NewsContext.Provider>;
};

export default NewsContextProvider;
