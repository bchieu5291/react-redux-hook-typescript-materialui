import PublicTemplate from "components/Template/PublicTemplate";
import { NewsContext } from "contexts/NewsContext";
import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { News } from "reducers/newsReducer";

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

    const [relatedNews, setRelatedNews] = useState<News[]>([]);

    //Start: Get all news
    useEffect(() => {
        getNews();
    }, [params]);

    useEffect(() => {
        findNews(params.id);

        // Shuffle array
        const shuffled = newsListing
            .filter((t) => t._id != params.id)
            .sort(() => 0.5 - Math.random());
        var relatedItems = shuffled.slice(0, 4);
        setRelatedNews(relatedItems);
    }, [newsListing]);

    return (
        <PublicTemplate>
            {newsDetail && (
                <div className="container">
                    <h1 className="my-4">{newsDetail.title}</h1>

                    <div className="row">
                        <div className="col-md-8">
                            <img
                                className="img-fluid"
                                src={`${newsDetail.imageFile.imageUrl.replace(
                                    "-original",
                                    "-detail"
                                )}`}
                                alt=""
                            />
                        </div>

                        <div className="col-md-4">
                            <h3 className="my-3">Information</h3>
                            <div dangerouslySetInnerHTML={{ __html: newsDetail.description }} />
                            <h3 className="my-3">Classifications</h3>
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
                        {relatedNews.map((item) => {
                            return (
                                <div key={item._id} className="col-md-3 col-sm-6 mb-4">
                                    <Link to={`/news/${item._id}`}>
                                        <img
                                            className="img-fluid"
                                            src={item.imageFile.imageUrl.replace(
                                                "-original",
                                                "-related"
                                            )}
                                            alt=""
                                        />
                                    </Link>
                                    <Link to={`/news/${item._id}`}>{item.title}</Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PublicTemplate>
    );
};

export default NewsDetailPages;
