import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { within } from "@testing-library/dom";
import { MemoryRouter } from "react-router-dom";

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockPost, mockCategory, mockTag } from "./stories/mockUtils";

import App from "./App";

test("Test Category Link", async () => {
  // We use axios-mock-adapter to help us mock response for axios.get,
  // which can make us reuse the mock data in mockUtils
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const elTag = screen.getByText("Categories");
  expect(elTag.tagName).toEqual("H5");
  expect(elTag).toHaveClass("card-header");
  const { getByText } = within(elTag.parentNode);

  // The test would wait and check if there is Programming text appear in
  // the Category widget. If it exists, it would click the link
  // (fireEvent.click(el))
  await waitFor(() => expect(getByText("Programming")).toBeInTheDocument());
  const el = getByText("Programming");
  fireEvent.click(el);

  // After it click the link, it would wait and check there is
  // Past Page 1 and Past Page 3 in the new page.
  // (It would check if the category filter function work as expected.)
  await waitFor(() =>
    expect(screen.getByText("Post Page 1")).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(screen.getByText("Post Page 3")).toBeInTheDocument()
  );
});

test("Test Pagination", async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("Post Page 1")).toBeInTheDocument()
  );

  const el = screen.getByText("Next");

  fireEvent.click(el);

  await waitFor(() =>
    expect(screen.getByText("Post Page 3")).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(screen.getByText("Post Page 4")).toBeInTheDocument()
  );
});

test("Check Post Link", async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // click on post link
  await waitFor(() =>
    expect(screen.getByText("Post Page 1")).toBeInTheDocument()
  );
  const el = screen.getByText("Post Page 1");
  fireEvent.click(el);

  // Check if the content of the post is render
  await waitFor(() =>
    expect(screen.getByText("Post Title")).toBeInTheDocument()
  );
});
