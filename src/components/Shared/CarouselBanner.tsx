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
                    className="d-block w-100"
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/15ae46dee65acfe6aa9c9e169b473bd3-firstNews"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/19c837d1267ce794e77b6aad6894f85f-firstNews"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/a79db5b629cd9bff7f8af076387fb650-firstNews"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/3403b1df1d05d89c131f536cd6c52240-firstNews"
                    alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselBanner;
