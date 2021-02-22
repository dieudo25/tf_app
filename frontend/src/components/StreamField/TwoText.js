import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { sanitize } from "dompurify";

function TwoText(props) {
  return (
    <Container className="py-4">
      <Row
        className={`align-items-center ${
          props.value.reverse ? "flex-row-reverse" : ""
        }`}
      >
        <Col xs={12} md={5}>
          <div
            // When we insert RichText string to React component,
            // we need to assign it todangerouslySetInnerHTML
            // To remove risks from the HTML,
            // we use DOMPurify45 which is a sanitizer for HTML to help us
            dangerouslySetInnerHTML={{
              __html: `${sanitize(props.value.text_1)}`,
            }}
          />
        </Col>
        <Col xs={12} md={5}>
          <div
            // When we insert RichText string to React component,
            // we need to assign it todangerouslySetInnerHTML
            // To remove risks from the HTML,
            // we use DOMPurify45 which is a sanitizer for HTML to help us
            dangerouslySetInnerHTML={{
              __html: `${sanitize(props.value.text_2)}`,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export { TwoText };
