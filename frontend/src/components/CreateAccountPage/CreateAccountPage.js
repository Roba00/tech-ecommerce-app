import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const CreateAccountPage = () => {
  const [validated, setValidated] = useState(false);

  this.state = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (<div id="create-account-view">
      <h1 style={{ margin: "10px 0px 15px 0px", textAlign: "center" }}>Create Account</h1>
      <Container fluid="md">
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" placeholder="Email: email@example.com" required/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control minLength='8' maxLength='32' type="password" placeholder="Password" required/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="10">
              <Form.Control minLength='8' maxLength='32' type="password" placeholder="Password" required/>
            </Col>
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>
      </Container>
    </div>);
};

CreateAccountPage.propTypes = {};

CreateAccountPage.defaultProps = {};

export default CreateAccountPage;
