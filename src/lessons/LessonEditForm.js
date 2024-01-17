import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Alert, Image } from "react-bootstrap";
import styles from "../styles/LessonCreateEditForm.module.css";
import appStyles from "../App.module.css";
import Asset from "../components/Asset";
import lessonUpload from "../assets/upload lesson.png";
import postDef from "../assets/postDef.png";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useLearningCategoryContext } from "../context/LearninCategoryContext";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const LessonEditForm = () => {
  const currentCategories = useLearningCategoryContext();
  const customMessage = "select category please";
  const history = useHistory();

  const [errors, setErrors] = useState({});
  const [lessonData, setLessonData] = useState({
    title: "",
    category: { id: "" },
    content: "",
    image: "",
    external_resources: "",
    learning_instructions: "",
  });

  //   fetch id from url
  const { id } = useParams();

  // fetching the post

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/lesson/${id}`);
        const {
          title,
          category,
          content,
          image,
          external_resources,
          learning_instructions,
          is_owner,
        } = data;
        console.log(data);
        // populating form if user
        // is author of the lesson
        if (is_owner) {
          setLessonData({
            title,
            category,
            content,
            image,
            external_resources,
            learning_instructions,
          });
        } else {
          history.push("/");
          toast.error("only author can edit lesson");
        }
      } catch (error) {
        toast.error(error?.status);
      }
    };
    handleMount();
  }, [id, history]);

  // refference to image
  const ImageInput = useRef(null);
  const defaultImage = postDef;
  const {
    title,
    category,
    content,
    image,
    external_resources,
    learning_instructions,
  } = lessonData;

  const handleChange = (e) => {
    setLessonData({
      ...lessonData,

      [e.target.name]:
        e.target.name === "category" ? { id: e.target.value } : e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setLessonData({
        ...lessonData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // posting data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // instantiate form object with
    // all the fields
    const formData = new FormData();
    formData.append("title", title);

    if (typeof category === "object" && category !== null) {
      formData.append("category", category.id);
    } else {
      formData.append("category", category);
    }

    formData.append("content", content);

    if (ImageInput?.current?.files[0]) {
      formData.append("image", ImageInput.current.files[0]);
    }

    formData.append("external_resources", external_resources);
    formData.append("learning_instructions", learning_instructions);

    try {
      await axiosReq.put(`/lesson/${id}`, formData);
      history.push(`/lesson/${id}`);
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
      toast.error(`${error?.response?.data?.detail}`);
    }
  };

  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {currentCategories?.map((category) => {
            const { id, owner, name } = category;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {/* Customize the error message for the category field */}
          {message === "Incorrect type. Expected pk value, received str."
            ? "Please select a valid category."
            : message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={8}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>External resources(URL)</Form.Label>
        <Form.Control
          type="text"
          name="external_resources"
          value={external_resources}
          onChange={handleChange}
        />
        {errors?.external_resources?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>
      <Form.Group>
        <Form.Label>Learning Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="learning_instructions"
          value={learning_instructions}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.learning_instructions?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button className="btn-dark mx-1" onClick={() => history.goBack()}>
        Cancel
      </Button>
      <Button className="btn-dark mx-1" type="submit">
        Update
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Row>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className="">{textFields}</Container>
        </Col>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={` ${styles.Container} d-flex flex-column justify-content-center  `}
            border="secondary"
          >
            <Form.Group className="text-center">
              <figure>
                <Image src={image} rounded className={appStyles.Image} />
              </figure>
              <div>
                <Form.Label className="btn btn-warning" htmlFor="image-upload">
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                className=""
                accept="image/*"
                style={{ marginLeft: "34%" }}
                onChange={handleChangeImage}
                ref={ImageInput}
                type="file"
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default LessonEditForm;
