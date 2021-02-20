import React from "react";
import { Container, Row } from "react-bootstrap";

import { MemoryRouter } from "react-router-dom";
import { Route } from "react-router";

import { HomePage } from "../components/HomePage";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockHomePage } from "./mockUtils";

export default {
  title: "HomePage",
  component: HomePage,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockHomePage(mock);

  return (
    <Container>
      <Row>
        <MemoryRouter initialEntries={["/pages/6/"]}>
          <Route path="/pages/:id" component={HomePage} />
        </MemoryRouter>
      </Row>
    </Container>
  );
};
