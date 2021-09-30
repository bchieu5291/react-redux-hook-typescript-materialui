import { IImageFile } from 'model/AuthForm'
import { BookActionType } from './types'

const {
    BOOK_LOADED_SUCCESS,
    BOOK_LOADED_FAIL,
    BOOK_LOADED_MORE_SUCCESS,
    ADD_BOOK,
    DELETE_BOOK,
    FIND_BOOK_BY_ID,
    UPDATE_BOOK,
} = BookActionType

export interface IBook {
    _id: string
    title: { [key: string]: string } | string
    description: { [key: string]: string } | string
    url: string
    type: string
    imageFile: IImageFile
    createAt: Date
}

export interface IAddUpdateBooks {
    _id: string
    title: string
    description: string
    url: string
    type: string
    imageFile: IImageFile
    createAt: Date
}

export interface IBookReducerState {
    bookListing: IBook[]
    bookListingLoading: boolean
    bookDetail: IAddUpdateBooks
    totalPages: number
    currentPage: number
    total: number
}

type PostAction =
    | {
          type: typeof BOOK_LOADED_SUCCESS
          payload: {
              bookListing: IBook[]
              totalPages: number
              currentPage: number
              total: number
          }
      }
    | {
          type: typeof BOOK_LOADED_MORE_SUCCESS
          payload: {
              books: IBook[]
              totalPages: number
              currentPage: number
              total: number
          }
      }
    | {
          type: typeof BOOK_LOADED_FAIL
          payload: IBook[]
      }
    | {
          type: typeof ADD_BOOK
          payload: IAddUpdateBooks
      }
    | {
          type: typeof DELETE_BOOK
          payload: string
      }
    | {
          type: typeof FIND_BOOK_BY_ID
          payload: IAddUpdateBooks
      }
    | {
          type: typeof UPDATE_BOOK
          payload: IAddUpdateBooks
      }

export const bookReducer = (state: IBookReducerState, action: PostAction) => {
    switch (action.type) {
        case BOOK_LOADED_SUCCESS:
            return {
                ...state,
                bookListing: action.payload.bookListing,
                bookListingLoading: false,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                total: action.payload.total,
            }
        case BOOK_LOADED_MORE_SUCCESS:
            return {
                ...state,
                bookListing: [...state.bookListing, ...action.payload.books],
                bookListingLoading: false,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                total: action.payload.total,
            }
        case ADD_BOOK:
            return {
                ...state,
                bookListing: [...state.bookListing, action.payload],
            }
        case DELETE_BOOK:
            return {
                ...state,
                bookListing: state.bookListing.filter((book) => book._id !== action.payload),
            }
        case FIND_BOOK_BY_ID:
            return {
                ...state,
                bookDetail: action.payload,
            }
        case UPDATE_BOOK:
            const newBookListing = state.bookListing.map((book) => {
                if (book._id === action.payload._id) {
                    return action.payload
                } else {
                    return book
                }
            })
            return {
                ...state,
                bookListing: newBookListing,
            }
        default:
            return state
    }
    return state
}
