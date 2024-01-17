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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const LessonCreateForm = () => {
  const currentCategories = useLearningCategoryContext();
  const customMessage = "select category please";

  const [errors, setErrors] = useState({});
  const [lessonData, setLessonData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
    external_resources: "",
    learning_instructions: "",
  });

  const history = useHistory();

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
      // [e.target.name]: e.target.value,
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

    if (ImageInput.current.files.length) {
      formData.append("image", ImageInput.current.files[0]);
    } else {
      // If no image is provided, append the default image as a blob
      // Blob stands for Binary Large Object, and it represents raw data
      //  in a format that can be easily handled.
      // const response = await fetch(defaultImage);
      // const blob = await response.blob();
      // formData.append("image", blob, "defaultImage.png");
      formData.append("image", "");
    }

    formData.append("external_resources", external_resources);
    formData.append("learning_instructions", learning_instructions);

    try {
      const { data } = await axiosReq.post("/lessons/", formData);
      history.push(`/lesson/${data.id}`);
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
          value={category.id}
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

      <Button className="btn-dark" onClick={() => history.goBack()}>
        cancel
      </Button>
      <Button className="btn-dark" type="submit">
        create
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
              {image ? (
                <>
                  <figure>
                    <Image src={image} rounded className={appStyles.Image} />
                  </figure>
                  <div>
                    <Form.Label
                      className="btn btn-warning"
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={lessonUpload}
                    message="CLick or tap to upload image"
                  />
                </Form.Label>
              )}

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

export default LessonCreateForm;
