import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../context/CurrentUserContext";
import Avatar from "../components/Avatar";
import { useLearningCategoryContext } from "../context/LearninCategoryContext";
import { FaComments } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import DropdownMenu from "../components/DropdownMenu";
import { IoSettings } from "react-icons/io5";
import styles from "../styles/DropDownMenu.module.css";
import { axiosRes } from "../api/axiosDefault";
import { toast } from "react-toastify";

const Lesson = (props) => {
  console.log("component mounting");
  const learningCategory = useLearningCategoryContext();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useCurrentUser();
  const history = useHistory();
  // edit and delete handlers for lesson

  const handleEdit = () => {
    history.push(`/lesson/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/lesson/${id}`);
      history.push("/lessons");
      toast.success("You deleted the Lesson");
    } catch (error) {
      console.log(error);
    }
  };

  // end handlers

  // menu on hover
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  // end menu

  const {
    id,
    author,
    category,
    title,
    image,
    content,
    learning_instructions,
    comments_count,
    external_resources,
    created_at,
    updated_at,
    profile_id,
    profile_image,
    lessonDetail,
  } = props;

  const is_owner = currentUser?.username === author;
  // fetching category name since category passed from
  // create form is PK only so we need to get the object of lesson category
  // and then drill in to get name
  const lessonCategory = learningCategory.find((cat) => cat?.id === category);

  return (
    <Container className="my-5">
      <h1
        className="my-5
      "
      >
        {title}
      </h1>
      <span className="h5 text-success">with id: {id}</span>

      <Row>
        {/* Image Section (Half-width on larger screens) */}
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between ">
                <p className=" h6 text-muted">Posted: {created_at}</p>

                <p className="mb-0 ">{lessonCategory?.name}</p>
              </div>

              <div className="d-flex text-start">
                <Link to={`/profile/${profile_id}`}>
                  <Avatar src={profile_image} height={30} />
                  {author}
                </Link>
              </div>
              {is_owner && lessonDetail && (
                <div className="d-flex">
                  <div
                    className="ml-auto w-25 mb-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="border-0 bg-transparent text-primary h4 d-flex  justify-content-end">
                      <IoSettings />
                    </span>
                    {isDropdownVisible && (
                      <DropdownMenu
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    )}
                  </div>
                </div>
              )}

              <Link to={`/lesson/${id}`}>
                <Card.Img
                  variant="top"
                  className="img-fluid"
                  src={image}
                  alt="Card image cap"
                />
              </Link>

              <p className="h6 mt-2 mb-0 text-primary">{updated_at}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Title Section (Half-width on larger screens) */}
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <section>
                <h2>Section 1</h2>
                <p>{content}</p>
              </section>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <section>
                <h2>Section </h2>
                <p>{external_resources}</p>
              </section>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content Sections (Full Width) */}
      <Row>
        {/* Section 1 */}
        <Col lg={12}></Col>

        {/* Full-width Section 3 */}
        <Col lg={12}>
          <section>
            <h2>Section 3 (Full Width)</h2>
            <p>{learning_instructions}</p>
          </section>
          <div className="w-75 text center bg-warning m-auto">
            <p>Comments</p>
            <Link to={`/lesson/${id}`}>
              <FaComments className="mr-2 " />
            </Link>
            {comments_count}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Lesson;
