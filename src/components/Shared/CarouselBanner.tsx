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
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/3403b1df1d05d89c131f536cd6c52240-banner"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/b4403d3364bf49e67fd6ea85c12d0850-banner"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/229c659ccbb29960bc9ed16ea27828d6-banner"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://g-node-test.s3.ap-southeast-1.amazonaws.com/2df12d36479f62cf983fe7bf19ddbe93-banner"
                    alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselBanner;
