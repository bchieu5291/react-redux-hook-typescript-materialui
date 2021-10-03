export interface UserForm {
    username: string
    password: string
}

export interface BaseReponseModel {
    success: true
    message: string
    data: any
}

export interface IRegisterForm {
    username: string
    password: string
    confirmPassword: string
}

export interface IToast {
    show: boolean
    message: string
    type: any
}

export interface IImageFile {
    _id: string
    imageUrl: string
}

export interface IDocumentFile {
    _id: string
    fileUrl: string
}
