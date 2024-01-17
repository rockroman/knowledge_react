import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefault";
import Lesson from "./Lesson";

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: lesson }] = await Promise.all([
          axiosReq.get(`lesson/${id}`),
        ]);
        setLesson({ results: [lesson] });
        console.log(lesson);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      {isLoading ? ( // Show a spinner while loading
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Row>
          <Col>
            <Lesson
              {...lesson.results[0]}
              setLessons={setLesson}
              lessonDetail
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default LessonDetail;
