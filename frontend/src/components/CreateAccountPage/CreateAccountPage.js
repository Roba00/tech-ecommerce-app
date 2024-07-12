import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const CREATE_ACCOUNT_QUERY = `${process.env.REACT_APP_SERVER_URL}/accounts/createAccount`;

const createAccountRequest = async (userCredentials) => {
  const response = await fetch(CREATE_ACCOUNT_QUERY, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(userCredentials)
  });
  return await response.json();
};

const CreateAccountPage = () => {
  const [validated, setValidated] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    location: '',
    image: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    phone: ''
  });

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (userCredentials.password !== userCredentials.confirmPassword) {
      alert("Confirm password does not match! Try again.");
      return;
    }
    
    const response = await createAccountRequest(userCredentials);
    console.log(response);
    const token = response.token;
    if (token !== "" && token !== null) {
      setValidated(true);
      sessionStorage.setItem("token", token)
      window.location.reload();
    }
    else {
      alert("Incorrect login! Try again.");
    }
  };

  return (<div id="create-account-view">
    <h1 style={{ margin: "10px 0px 15px 0px", textAlign: "center" }}>Create Account</h1>
    <Container fluid="md">
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Name" required
              onChange={e => setUserCredentials({
                name: e.target.value,
                location: userCredentials.location,
                image: userCredentials.image,
                email: userCredentials.email,
                password: userCredentials.password,
                confirmPassword: userCredentials.confirmPassword,
                title: userCredentials.title,
                phone: userCredentials.phone
              })} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextLocation">
          <Form.Label column sm="2">
            Location
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Location" required
              onChange={e => setUserCredentials({
                  name: userCredentials.name,
                  location: e.target.value,
                  image: userCredentials.image,
                  email: userCredentials.email,
                  password: userCredentials.password,
                  confirmPassword: userCredentials.confirmPassword,
                  title: userCredentials.title,
                  phone: userCredentials.phone
                })} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextImage">
          <Form.Label column sm="2">
            Image URL
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="https://site.com/picture.png" required
              onChange={e => setUserCredentials({
                name: userCredentials.name,
                location: userCredentials.location,
                image: e.target.value,
                email: userCredentials.email,
                password: userCredentials.password,
                confirmPassword: userCredentials.confirmPassword,
                title: userCredentials.title,
                phone: userCredentials.phone
              })} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextImage">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Professional/Job Title" required
              onChange={e => setUserCredentials({
                name: userCredentials.name,
                location: userCredentials.location,
                image: userCredentials.image,
                email: userCredentials.email,
                password: userCredentials.password,
                confirmPassword: userCredentials.confirmPassword,
                title: e.target.value,
                phone: userCredentials.phone
              })} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextImage">
          <Form.Label column sm="2">
            Phone
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="(123) 456-7890" required
              onChange={e => setUserCredentials({
                name: userCredentials.name,
                location: userCredentials.location,
                image: userCredentials.image,
                email: userCredentials.email,
                password: userCredentials.password,
                confirmPassword: userCredentials.confirmPassword,
                title: userCredentials.title,
                phone: e.target.value
              })} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control type="email" placeholder="Email: email@example.com" required
              onChange={e => setUserCredentials({
                name: userCredentials.name,
                location: userCredentials.location,
                image: userCredentials.image,
                email: e.target.value,
                password: userCredentials.password,
                confirmPassword: userCredentials.confirmPassword,
                title: userCredentials.title,
                phone: userCredentials.phone
              })} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control minLength='8' maxLength='32' type="password" placeholder="Password" required
              onChange={e => setUserCredentials({
                name: userCredentials.name,
                location: userCredentials.location,
                image: userCredentials.image,
                email: userCredentials.email,
                password: e.target.value,
                confirmPassword: userCredentials.confirmPassword,
                title: userCredentials.title,
                phone: userCredentials.phone
              })} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Confirm Password
          </Form.Label>
          <Col sm="10">
            <Form.Control minLength='8' maxLength='32' type="password" placeholder="Password" required
              onChange={e => setUserCredentials({
                name: userCredentials.name,
                location: userCredentials.location,
                image: userCredentials.image,
                email: userCredentials.email,
                password: userCredentials.password,
                confirmPassword: e.target.value,
                title: userCredentials.title,
                phone: userCredentials.phone
              })} />
          </Col>
        </Form.Group>

        <Button type="submit">Create Account</Button>
      </Form>
    </Container>
  </div>);
};

CreateAccountPage.propTypes = {};

CreateAccountPage.defaultProps = {};

export default CreateAccountPage;
