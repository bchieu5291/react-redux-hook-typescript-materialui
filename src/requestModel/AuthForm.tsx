export interface UserForm {
    username: string;
    password: string;
}

export interface BaseReponseModel {
    success: true;
    message: string;
    data: any;
}

export interface IRegisterForm {
    username: string;
    password: string;
    confirmPassword: string;
}
