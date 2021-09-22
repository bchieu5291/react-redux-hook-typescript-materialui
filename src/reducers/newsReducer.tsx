import { PostsActionType } from './types'
import { NewsActionType } from 'reducers/types'
import { IImageFile } from 'model/AuthForm'
import { Classification, ClassificationReponse } from './classificationReducer'

const {
    NEWS_LOADED_SUCCESS,
    NEWS_LOADED_MORE_SUCCESS,
    NEWS_LOADED_FAIL,
    ADD_NEWS,
    DELETE_NEWS,
    FIND_NEWS_BY_ID,
    UPDATE_NEWS,
} = NewsActionType

export interface News {
    _id: string
    title: { [key: string]: string } | string
    description: string
    url: string
    imageFile: IImageFile
    classifications: ClassificationReponse[]
    createAt: Date
}

export interface IAddUpdateNews {
    _id: string
    title: string
    description: string
    url: string
    imageFile: IImageFile
    classifications: ClassificationReponse[]
    createAt: Date
}

export interface NewsReducerState {
    newsListing: News[]
    newsListingLoading: boolean
    newsDetail: IAddUpdateNews
    totalPages: number
    currentPage: number
    total: number
}

type PostAction =
    | {
          type: typeof NEWS_LOADED_SUCCESS
          payload: {
              newsListing: News[]
              totalPages: number
              currentPage: number
              total: number
          }
      }
    | {
          type: typeof NEWS_LOADED_MORE_SUCCESS
          payload: {
              newsListing: News[]
              totalPages: number
              currentPage: number
              total: number
          }
      }
    | {
          type: typeof NEWS_LOADED_FAIL
          payload: News[]
      }
    | {
          type: typeof ADD_NEWS
          payload: IAddUpdateNews
      }
    | {
          type: typeof DELETE_NEWS
          payload: string
      }
    | {
          type: typeof FIND_NEWS_BY_ID
          payload: IAddUpdateNews
      }
    | {
          type: typeof UPDATE_NEWS
          payload: IAddUpdateNews
      }

export const newsReducer = (state: NewsReducerState, action: PostAction) => {
    switch (action.type) {
        case NEWS_LOADED_SUCCESS:
            return {
                ...state,
                newsListing: action.payload.newsListing,
                newsListingLoading: false,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                total: action.payload.total,
            }
        case NEWS_LOADED_MORE_SUCCESS:
            return {
                ...state,
                newsListing: [...state.newsListing, ...action.payload.newsListing],
                newsListingLoading: false,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                total: action.payload.total,
            }
        case ADD_NEWS:
            return {
                ...state,
                newsListing: [...state.newsListing, action.payload],
            }
        case DELETE_NEWS:
            return {
                ...state,
                newsListing: state.newsListing.filter((news) => news._id !== action.payload),
            }
        case FIND_NEWS_BY_ID:
            return {
                ...state,
                newsDetail: action.payload,
            }
        case UPDATE_NEWS:
            const newNews = state.newsListing.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload
                } else {
                    return post
                }
            })
            return {
                ...state,
                newsListing: newNews,
            }
        default:
            return state
    }
    return state
}
