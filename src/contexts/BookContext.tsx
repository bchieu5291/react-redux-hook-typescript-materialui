import axios from 'axios'
import { IToast } from 'model/AuthForm'
import { createContext, ReactNode, useReducer, useState } from 'react'
import { bookReducer, IAddUpdateBooks, IBookReducerState } from 'reducers/bookReducer'
import { BookActionType } from 'reducers/types'
import { apiUrl } from '../ultilities/constanst'

const {
    BOOK_LOADED_SUCCESS,
    BOOK_LOADED_MORE_SUCCESS,
    BOOK_LOADED_FAIL,
    ADD_BOOK,
    DELETE_BOOK,
    FIND_BOOK_BY_ID,
    UPDATE_BOOK,
} = BookActionType

interface Props {
    children: ReactNode
}

interface ContextDefault {
    bookState: IBookReducerState
    getBook: (title?: string, page?: number, length?: number) => void
    addBook: (newBook: FormData) => any
    showAddBookModal: boolean
    setShowAddBookModal: (showAddNewsModal: boolean) => void
    // deleteNews: (newsId: string) => any
    // findNews: (newsId: string) => any
    // showUpdateNewsModal: boolean
    // setShowUpdateNewsModal: (showUpdateNewsModal: boolean) => void
    // updateNews: (news: FormData) => any
}

const defaultPostData: IAddUpdateBooks = {
    _id: '',
    title: '',
    description: '',
    url: '',
    createAt: new Date(),
    imageFile: {
        _id: '',
        imageUrl: '',
    },
}

const defaultData: IBookReducerState = {
    bookDetail: defaultPostData,
    bookListing: [],
    bookListingLoading: false,
    totalPages: 0,
    currentPage: 0,
    total: 0,
}

const defaultToastData: IToast = {
    show: false,
    message: '',
    type: null,
}

export const BookContext = createContext<ContextDefault>({
    bookState: defaultData,
    getBook: () => {},
    addBook: () => {},
    showAddBookModal: false,
    setShowAddBookModal: () => {},
    // deleteNews: () => {},
    // findNews: () => {},
    // showUpdateNewsModal: false,
    // setShowUpdateNewsModal: () => {},
    // updateNews: () => {},
})

const BookContextProvider = ({ children }: Props) => {
    //reducer
    const [bookState, dispatch] = useReducer(bookReducer, defaultData)

    //state
    const [showAddBookModal, setShowAddBookModal] = useState(false)
    const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false)
    // const [showToast, setShowToast] = useState<IToast>({
    //     show: true,
    //     message: "",
    //     type: null,
    // });

    //get News
    const getBook = async (title?: string, page?: number, length?: number) => {
        try {
            const response = await axios.get(
                `${apiUrl}/books?title=${title ?? ''}&page=${page ?? 0}&length=${length ?? 0}`
            )
            if (response.data.success) {
                dispatch({
                    type: BOOK_LOADED_SUCCESS,
                    payload: {
                        bookListing: response.data.books.docs,
                        totalPages: response.data.books.totalPages,
                        currentPage: response.data.books.page,
                        total: response.data.books.totalDocs,
                    },
                })
            }
        } catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    // //add Book
    const addBook = async (newBook: FormData) => {
        try {
            axios({
                method: 'post',
                url: `${apiUrl}/books`,
                data: newBook,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(function (response) {
                //handle success
                if (response.data.success) {
                    dispatch({
                        type: ADD_BOOK,
                        payload: response.data.book,
                    })

                    return response.data
                }
            })
        } catch (error: any) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    // // Find post when user click on post and add it to Post Context
    // const findNews = (newsId: string) => {
    //     const news = bookState.newsListing.find((item) => item._id == newsId)
    //     dispatch({
    //         type: FIND_NEWS_BY_ID,
    //         payload: news as IAddUpdateNews,
    //     })
    // }

    // // update news
    // const updateNews = async (updatedNews: FormData) => {
    //     try {
    //         const url = `${apiUrl}/news/${bookState.newsDetail._id}`
    //         axios({
    //             method: 'put',
    //             url: url,
    //             data: updatedNews,
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         }).then(function (response) {
    //             //handle success
    //             if (response.data.success) {
    //                 dispatch({
    //                     type: UPDATE_NEWS,
    //                     payload: response.data.news,
    //                 })

    //                 return response.data
    //             }
    //         })
    //     } catch (error: any) {
    //         return error.response.data
    //             ? error.response.data
    //             : { success: false, message: 'Server error' }
    //     }
    // }

    // //delete Posts
    // const deleteNews = async (newsId: string) => {
    //     try {
    //         const response = await axios.delete(`${apiUrl}/news/${newsId}`)
    //         if (response.data.success) {
    //             dispatch({
    //                 type: DELETE_NEWS,
    //                 payload: newsId,
    //             })

    //             return response.data
    //         }
    //     } catch (error: any) {
    //         return error.response.data
    //             ? error.response.data
    //             : { success: false, message: 'Server error' }
    //     }
    // }

    //context data
    const bookContextData = {
        bookState: bookState,
        getBook: getBook,
        addBook,
        showAddBookModal,
        setShowAddBookModal,
        // deleteNews,
        // findNews,
        // showUpdateNewsModal,
        // setShowUpdateNewsModal,
        // updateNews,
    }

    return <BookContext.Provider value={bookContextData}>{children}</BookContext.Provider>
}

export default BookContextProvider
