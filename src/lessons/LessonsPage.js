import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefault";
import Lesson from "./Lesson";
import { Card, Container, Form } from "react-bootstrap";
import Asset from "../components/Asset";
import NoResult from "../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils/utils";

const LessonsPage = ({ message, filter }) => {
  const [lessons, setLessons] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axiosReq.get(`/lessons/?search=${query}`);
        console.log(data);
        setLessons(data);
        // setLessons({ results: data });
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    setHasLoaded(false);
    // fetchLessons();
    const timer = setTimeout(() => {
      fetchLessons();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, query]);
  return (
    <>
      <div className="text-center">
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="search Lessons"
            className="border border-success"
            style={{ width: "65%" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form>
      </div>
      {hasLoaded ? (
        <>
          {lessons.results && lessons.results.length > 0 ? (
            <InfiniteScroll
              children={lessons.results.map((lesson) => {
                return (
                  <Card key={lesson.id} className="my-2 pb-0">
                    <Card.Body>
                      <Lesson {...lesson} />
                    </Card.Body>
                  </Card>
                );
              })}
              dataLength={lessons.results.length}
              loader={<Asset spinner />}
              hasMore={!!lessons.next}
              next={() => fetchMoreData(lessons, setLessons)}
            />
          ) : (
            <Container>
              <Asset src={NoResult} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </>
  );
};

export default LessonsPage;
