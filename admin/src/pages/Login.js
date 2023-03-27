import React from "react";
import { Form, Button } from "react-bootstrap";

function Login({ language }) {
  return (
    <Form>
      <h2>{language === "en" ? "Log In" : "Logowanie"}</h2>
      <Form.Group>
        <Form.Label>
          {language === "en" ? "Email" : "Adres e-mail"}
        </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          {language === "en" ? "Password" : "Hasło"}
        </Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        {language === "en" ? "Log In" : "Zaloguj się"}
      </Button>
    </Form>
  );
}

export default Login;