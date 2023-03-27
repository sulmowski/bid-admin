import React from "react";
import { Button, Container } from "react-bootstrap";

function Home({ language }) {
  return (
    <Container
      fluid
      className="p-5 bg-light text-center text-lg-start"
      style={{ minHeight: "100vh" }}
    >
      <h1>{language === "en" ? "Welcome" : "Witaj"}</h1>
      <p>
        {language === "en"
          ? "This is the about page"
          : "To jest strona o mnie"}
      </p>
      <Button variant="primary">
        {language === "en" ? "Learn more" : "Dowiedz się więcej"}
      </Button>
    </Container>
  );
}

export default Home;