import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <Container fluid className="bg-light mt-5 pt-3">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <p className="text-center">
            &copy; 2023 React Site. All Rights Reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;