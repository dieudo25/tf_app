import React from "react";

import { PostPage } from "../components/PostPage";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockPost, mockTag } from "./mockUtils";

export default {
  title: "PostPage",
  component: PostPage,
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockTag(mock);

  return <PostPage />;
};
