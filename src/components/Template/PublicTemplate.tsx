import React, { ReactNode } from "react";
import PublicNavbar from "components/Shared/PublicNavbar";
import Footer from "components/Shared/Footer";

interface IProps {
    children: ReactNode;
}

const PublicTemplate = ({ children }: IProps) => {
    return (
        <>
            <PublicNavbar />
            {children}
            <Footer />
        </>
    );
};

export default PublicTemplate;
