import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import playIcon from "assets/play-btn.svg";
import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { apiUrl } from "ultilities/constanst";

const PortalResizeImage = () => {
    const [loading, setLoading] = useState(false);

    const onResizeImage = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/resizeImage`);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
        }
    };

    return (
        <>
            <Row className="mx-auto mt-3 ">
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>News</Col>
                                <Col className="text-right">
                                    <IconButton
                                        icon={<RepeatIcon />}
                                        aria-label="delete"
                                        onClick={onResizeImage}
                                        isLoading={loading}
                                    >
                                        <img src={playIcon} alt="edit" width="24" height="24" />
                                    </IconButton>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PortalResizeImage;
