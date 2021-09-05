import PublicTemplate from "components/Template/PublicTemplate";
import { NewsContext } from "contexts/NewsContext";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const { CKEditor } = require("@ckeditor/ckeditor5-react");

interface IProps {
    id: string;
}

const NewsDetailPages = () => {
    const params = useParams<IProps>();
    //context
    const {
        newsState: { newsListing, newsListingLoading, newsDetail },
        getNews,
        findNews,
    } = useContext(NewsContext);

    //Start: Get all news
    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        findNews(params.id);
    }, [newsListing]);

    return (
        <PublicTemplate>
            {newsDetail && (
                <div className="container">
                    <h1 className="my-4">News Detail</h1>

                    <div className="row">
                        <div className="col-md-8">
                            <img
                                className="img-fluid"
                                src={`${newsDetail.imageFile.imageUrl}`}
                                alt=""
                            />
                        </div>

                        <div className="col-md-4">
                            <h3 className="my-3">{newsDetail.title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: newsDetail.description }} />
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
            )}
        </PublicTemplate>
    );
};

export default NewsDetailPages;
