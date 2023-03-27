import React from "react";
import { Button } from "react-bootstrap";
import { Jumbotron } from 'react-bootstrap';

function Home({ language }) {
  return (
    <Jumbotron>
      <h1>{language === "en" ? "Welcome" : "Witaj"}</h1>
      <p>
        {language === "en"
          ? "This is the home page"
          : "To jest strona główna"}
      </p>
      <Button variant="primary">
        {language === "en" ? "Learn more" : "Dowiedz się więcej"}
      </Button>
    </Jumbotron>
  );
}

export default Home;