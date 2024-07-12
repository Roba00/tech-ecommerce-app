import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const LOGIN_QUERY = `${process.env.REACT_APP_SERVER_URL}/accounts/login`;

const sendLoginRequest = async (userCredentials) => {
  const response = await fetch(LOGIN_QUERY, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(userCredentials)
  });
  return await response.json();
};

const LogInPage = () => {
  const [validated, setValidated] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    const response = await sendLoginRequest(userCredentials);
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

  return (
    <div id="login-view">
      <h1 style={{ margin: "10px 0px 15px 0px", textAlign: "center" }}>Login</h1>
      <Container fluid="md">
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" placeholder="Email: email@example.com" required
                onChange={e => setUserCredentials({ email: e.target.value, password: userCredentials.password })} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control minLength='8' maxLength='32' type="password" placeholder="Password" required
                onChange={e => setUserCredentials({ email: userCredentials.email, password: e.target.value })} />
            </Col>
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    </div>);
};

LogInPage.propTypes = {};

LogInPage.defaultProps = {};

export default LogInPage;
