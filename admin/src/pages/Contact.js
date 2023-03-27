import React from "react";
import { Form, Button } from "react-bootstrap";

function Contact({ language }) {
  return (
    <Form>
      <h2>
        {language === "en" ? "Contact Us" : "Skontaktuj się z nami"}
      </h2>
      <Form.Group>
        <Form.Label>
          {language === "en" ? "Name" : "Imię i nazwisko"}
        </Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          {language === "en" ? "Email" : "Adres e-mail"}
        </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          {language === "en" ? "Message" : "Wiadomość"}
        </Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Button variant="primary" type="submit">
        {language === "en" ? "Submit" : "Wyślij"}
      </Button>
    </Form>
  );
}

export default Contact;