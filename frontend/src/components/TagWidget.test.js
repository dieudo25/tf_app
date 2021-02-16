import React from "react";

import { render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import axios from "axios";

import { TagWidget } from "./TagWidget";

// Used to mock the axios module
jest.mock("axios");

// Use Async/Await to make testing asynchronous code possible
test("render Tag widget", async () => {
  // Test for the render of the TagWidget component

  // Arrange
  // Mock data for test
  const resp = {
    data: {
      results: [
        {
          slug: "wagtail",
          name: "Wagtail",
        },
        {
          slug: "django",
          name: "Django",
        },
        {
          slug: "react",
          name: "React",
        },
      ],
    },
  };

  // Make the axios.get method get method return the mock data "resp"
  axios.get.mockResolvedValue(resp);

  // Action
  // asFragment can help us get DocumentFragment of our component
  const { asFragment } = render(
    // Use MemoryRouter because TagWidget contains Link componente from react-router-dom
    <MemoryRouter>
      <TagWidget />
    </MemoryRouter>
  );

  // Assert
  // Test if the text "Loading..." is in the DOM
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // We use await and waitFor to let jest wait and keep running after
  // expect statement return true
  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  await waitFor(() => expect(screen.getByText("Wagtail")).toBeInTheDocument());
  const el = screen.getByText("Wagtail");
  expect(el.tagName).toEqual("SPAN");
  expect(el).toHaveClass("badge badge-secondary");

  resp.data.results.map((tag) =>
    expect(screen.getByText(tag.name)).toBeInTheDocument()
  );

  // Check if the fragment match the snapshot
  // Snapshot tests are a very useful tool whenever you want
  // to make sure your UI does not change unexpectedly
  // The logic of Snapshot tests is it would compare snapshot
  // or the component and make sure the UI would be consistent during the test.
  expect(asFragment()).toMatchSnapshot();
});
