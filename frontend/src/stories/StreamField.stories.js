import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BodyBlock, StreamField } from "../components/StreamField/BodyBlock";

import { mockBodyBlockData } from "./mockUtils";

export default {
  title: "BodyBlockField",
  component: BodyBlock,
};

export const Example = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <BodyBlock value={mockBodyBlockData} />
        </Col>
      </Row>
    </Container>
  );
};
