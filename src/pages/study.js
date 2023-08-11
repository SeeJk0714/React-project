import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";

export default function Study() {
    const [keywords, setKeywords] = useState("");
    const studyList = JSON.parse(localStorage.getItem("plans"));

    const searchedList = useMemo(() => {
        // if (journalList) {
        //     return journalList.filter(
        //         (i) =>
        //             i.title.toLowerCase().indexOf(keywords.toLowerCase()) >=
        //                 0 ||
        //             i.content.toLowerCase().indexOf(keywords.toLowerCase()) >= 0
        //     );
        // }
        if (studyList) {
            return studyList.filter(
                (i) =>
                    i.title.toLowerCase().indexOf(keywords.toLowerCase()) >=
                        0 ||
                    i.content.toLowerCase().indexOf(keywords.toLowerCase()) >= 0
            );
        }
    }, [studyList, keywords]);

    return (
        <div
            className="container mt-5 mx-auto"
            style={{
                maxWidth: "800px",
            }}
        >
            <InputGroup hasValidation>
                <InputGroup.Text>
                    <AiOutlineFileSearch />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    value={keywords}
                    placeholder="Type your keyword..."
                    onChange={(event) => {
                        setKeywords(event.target.value);
                    }}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please choose a username.
                </Form.Control.Feedback>
            </InputGroup>
            <Container>
                <Row>
                    {searchedList.length > 0 ? (
                        searchedList.map((plan) => {
                            const { id, title, content, startTime, endTime } =
                                plan;
                            return (
                                <Col lg={4} md={6} className="mt-4 ">
                                    <Link
                                        to={`/post/${id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Card
                                            style={{
                                                height: "200px",
                                                width: "250px",
                                            }}
                                        >
                                            <Card.Body>
                                                <Card.Title>{title}</Card.Title>
                                                <Card.Text>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: content,
                                                        }}
                                                    />
                                                </Card.Text>
                                            </Card.Body>
                                            <Row className="mb-3">
                                                <small className="col-9 text-muted">
                                                    {startTime} - {endTime}
                                                </small>
                                                <GiNotebook className="col-3 fs-2" />
                                            </Row>
                                        </Card>
                                    </Link>
                                </Col>
                            );
                        })
                    ) : (
                        <Col>No this word added yet.</Col>
                    )}
                </Row>
            </Container>
        </div>
    );
}
