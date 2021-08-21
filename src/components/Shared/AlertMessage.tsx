import React from "react";
import { Alert } from "react-bootstrap";

export interface IAlert {
    type: string;
    message: string;
}

const AlertMessage = (info: IAlert) => {
    return !info.message ? null : <Alert variant={info.type}>{info.message}</Alert>;
};

export default AlertMessage;
