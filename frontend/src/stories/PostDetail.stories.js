import React from "react";
import { Container, Row } from "react-bootstrap";

import { MemoryRouter } from "react-router-dom";
import { Route } from "react-router";

import { PostDetail } from "../components/PostDetail";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockPost } from "./mockUtils";

export default {
  title: "PostDetail",
  component: PostDetail,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  // mockPost();

  return (
    <Container>
      <Row>
        <MemoryRouter initialEntries={["/post/5/"]}>
          <Route path="/post/:id" component={PostDetail} />
        </MemoryRouter>
      </Row>
    </Container>
  );
};
