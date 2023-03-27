import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

function Home({ language }) {
  return (
    <Jumbotron>
      <h1>{language === "en" ? "Welcome" : "Witaj"}</h1>
      <p>
        {language === "en"
          ? "This is the about page"
          : "To jest strona o mnie"}
      </p>
      <Button variant="primary">
        {language === "en" ? "Learn more" : "Dowiedz się więcej"}
      </Button>
    </Jumbotron>
  );
}

export default Home;