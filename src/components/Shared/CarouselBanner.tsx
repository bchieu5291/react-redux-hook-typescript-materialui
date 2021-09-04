import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const CarouselBanner = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100 maxH-250"
                    src="/images/nodejs.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 maxH-250"
                    src="/images/React_Banner.png"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 maxH-250"
                    src="/images/siteinifty-banner.png"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 maxH-250"
                    src="/images/umbraco_social_og.png"
                    alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselBanner;
