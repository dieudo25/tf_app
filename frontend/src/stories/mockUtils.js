import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockTag = (mockAxios) => {
  const API_REQUEST = "/api/blog/tags/";
  mockAxios.onGet(API_REQUEST).reply(200, {
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
  });
};

export { mockTag };
