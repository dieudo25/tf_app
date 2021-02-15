import React from "react";
import { Container, Row } from "react-bootstrap";
import { PostDetail } from "../components/PostDetail";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockPost } from "./mockUtils";

export default {
  title: "PostDefault",
  component: PostDetail,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);

  return (
    <Container>
      <Row>
        <PostDetail />
      </Row>
    </Container>
  );
};
