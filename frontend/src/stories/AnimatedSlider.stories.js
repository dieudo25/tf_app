import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MemoryRouter } from "react-router-dom";
import { AnimatedSlider } from "../components/StreamField/AnimatedSlider";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { mockPost } from "./mockUtils";

export default {
  title: "AnimatedSlider",
  component: AnimatedSlider,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <MemoryRouter>
            <AnimatedSlider />
          </MemoryRouter>
        </Col>
      </Row>
    </Container>
  );
};
