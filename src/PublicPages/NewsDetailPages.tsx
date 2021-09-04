import PublicTemplate from "components/Template/PublicTemplate";
import { NewsContext } from "contexts/NewsContext";
import React, { useContext } from "react";

const { CKEditor } = require("@ckeditor/ckeditor5-react");

interface IAddNews {
    title: string;
    description: string;
    url: string;
    image: File[];
}

const NewsDetailPages = () => {
    //context
    const {
        newsState: { newsDetail },
    } = useContext(NewsContext);

    return (
        <PublicTemplate>
            <div className="container">
                <h1 className="my-4">News Detail</h1>

                <div className="row">
                    <div className="col-md-8">
                        <img
                            className="img-fluid"
                            src={`data:image/jpeg;base64,${newsDetail.imageFile.imagebase64}`}
                            alt=""
                        />
                    </div>

                    <div className="col-md-4">
                        <h3 className="my-3">{newsDetail.title}</h3>
                        <p>{newsDetail.description}</p>
                        <h3 className="my-3">Project Details</h3>
                        <ul>
                            <li>Lorem Ipsum</li>
                            <li>Dolor Sit Amet</li>
                            <li>Consectetur</li>
                            <li>Adipiscing Elit</li>
                        </ul>
                    </div>
                </div>

                <h3 className="my-4">Related Projects</h3>

                <div className="row">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                            <img
                                className="img-fluid"
                                src="https://via.placeholder.com/500x300"
                                alt=""
                            />
                        </a>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                            <img
                                className="img-fluid"
                                src="https://via.placeholder.com/500x300"
                                alt=""
                            />
                        </a>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                            <img
                                className="img-fluid"
                                src="https://via.placeholder.com/500x300"
                                alt=""
                            />
                        </a>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                            <img
                                className="img-fluid"
                                src="https://via.placeholder.com/500x300"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
            </div>
        </PublicTemplate>
    );
};

export default NewsDetailPages;
