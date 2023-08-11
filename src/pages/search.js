import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineFileSearch } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Search() {
    const [keywords, setKeywords] = useState("");

    const journalList = JSON.parse(localStorage.getItem("journal"));

    const searchedList = useMemo(() => {
        return journalList.filter(
            (i) => i.title.toLowerCase().indexOf(keywords.toLowerCase()) >= 0
        );
    }, [journalList, keywords]);
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
                        searchedList.map((q) => {
                            return (
                                <Col lg={4} md={6}>
                                    <Card
                                        style={{
                                            height: "230px",
                                            width: "250px",
                                        }}
                                    >
                                        <Card.Body>
                                            <Card.Title>{q.title}</Card.Title>
                                            <Card.Text>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: q.content,
                                                    }}
                                                />
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>{q.date}</h6>
                                            </Card.Text>
                                            <Link
                                                to={`/post/${q.id}`}
                                                className="btn btn-primary me-2 "
                                            >
                                                Show All
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={3}>No income added yet.</td>
                        </tr>
                    )}
                </Row>
            </Container>
        </div>
    );
}
