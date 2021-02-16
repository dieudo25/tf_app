import Router from "react";
import { MemoryRouter, MemoryUser } from "react-router-dom";

import App from "../App";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockPost, mockTag, mockCategory } from "./mockUtils";

export default {
  title: "App",
  component: App,
  decorators: [],
};

export const Example = () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockTag(mock);
  mockCategory(mock);

  return (
    <MemoryRouter initialEntries={["/3"]}>
      <App />
    </MemoryRouter>
  );
};
