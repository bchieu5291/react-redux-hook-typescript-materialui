import { ClassficationActionType } from './types'

const { CLASSIFICATION_LOADED_FAIL, CLASSIFICATION_LOADED_SUCCESS } = ClassficationActionType

export interface ClassificationReponse {
    _id: string
    title: string
}

export interface Classification {
    value: string
    label: string
}

export interface ClassificationState {
    classifications: Classification[]
    classificationsLoading: boolean
}

type PostAction =
    | {
          type: typeof CLASSIFICATION_LOADED_SUCCESS
          payload: Classification[]
      }
    | {
          type: typeof CLASSIFICATION_LOADED_FAIL
          payload: Classification[]
      }

export const classificationReducer = (state: ClassificationState, action: PostAction) => {
    switch (action.type) {
        case CLASSIFICATION_LOADED_SUCCESS:
            return {
                ...state,
                classifications: action.payload,
                classificationsLoading: false,
            }
        case CLASSIFICATION_LOADED_FAIL:
            return {
                ...state,
                classifications: [],
                classificationsLoading: false,
            }
        default:
            return state
    }
}
