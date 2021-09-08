import axios from "axios";
import { createContext, ReactNode, useReducer, useState } from "react";
import { ClassficationActionType, PostsActionType } from "reducers/types";
import { IToast } from "model/AuthForm";
import { apiUrl } from "../ultilities/constanst";
import { Post } from "./../reducers/postReducer";
import {
    Classification,
    classificationReducer,
    ClassificationReponse,
    ClassificationState,
} from "reducers/classificationReducer";

const { CLASSIFICATION_LOADED_FAIL, CLASSIFICATION_LOADED_SUCCESS } = ClassficationActionType;

interface Props {
    children: ReactNode;
}

interface ClassificationDefault {
    classifcationState: ClassificationState;
    getClassifications: () => void;
}

const defaultPostData: Classification = {
    value: "",
    label: "",
};

const defaultData: ClassificationState = {
    classifications: [] as Classification[],
    classificationsLoading: false,
};

// const defaultToastData: IToast = {
//     show: false,
//     message: "",
//     type: null,
// };

export const ClassificationContext = createContext<ClassificationDefault>({
    classifcationState: defaultData,
    getClassifications: () => {},
});

const ClassificationContextProvider = ({ children }: Props) => {
    //reducer
    const [classifcationState, dispatch] = useReducer(classificationReducer, defaultData);

    //state
    // const [showAddPostModal, setShowAddPostModal] = useState(false);
    // const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    // const [showToast, setShowToast] = useState<IToast>({
    //     show: true,
    //     message: "",
    //     type: null,
    // });

    //get Posts
    const getClassifications = async () => {
        try {
            const response = await axios.get(`${apiUrl}/classifications`);
            if (response.data.success) {
                const formatReponse: Classification[] = (
                    response.data.classifications as ClassificationReponse[]
                ).map((item) => ({
                    value: item._id,
                    label: item.title,
                }));
                dispatch({
                    type: CLASSIFICATION_LOADED_SUCCESS,
                    payload: formatReponse,
                });
            }
        } catch (error: any) {
            return error.response?.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //context data
    const postContextData = {
        getClassifications,
        classifcationState,
    };

    return (
        <ClassificationContext.Provider value={postContextData}>
            {children}
        </ClassificationContext.Provider>
    );
};

export default ClassificationContextProvider;
