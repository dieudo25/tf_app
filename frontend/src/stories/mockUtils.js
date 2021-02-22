import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import cardImage from "./assets/image_1.jpg";
import cardImage2 from "./assets/image_2.jpg";
import cardImage3 from "./assets/image_3.jpg";

// StramField.js
const richtext_1 = `
<p>
  &quot;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
  eaque ipsa quae ab illo inventore veritatiset quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
  sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
  consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam 
  quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
  laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate 
  velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?&quot;
</p>
`;

const richtext_2 = `
<p>
  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;
</p>
`;

const mockHomePageStreamFieldData = [
  {
    type: "slider",
    value: [
      {
        type: "animated_slider",
        value: [
          {
            title: "Slider 1",
            description:
              "<p>&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>",
            button_text: "button 1",
            button: 3,
            image: {
              url: cardImage,
              width: 640,
              height: 427,
              alt: "tim-marshall-cAtzHUz7Z8g-unsplash.jpg",
            },
          },
          {
            title: "Slider 2",
            description:
              "<p>&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>",
            button_text: "button 2",
            button: 4,
            image: {
              url: cardImage3,
              width: 640,
              height: 427,
              alt: "image 2",
            },
          },
        ],
      },
    ],
  },
];

const mockStreamFieldData = [
  {
    type: "h1",
    value: "Post Title",
  },
  {
    type: "h2",
    value: "Post Subtitle",
  },
  {
    type: "paragraph",
    value: richtext_1,
  },
  {
    type: "image_text",
    value: {
      image: {
        alt: "image 1",
        url: cardImage,
      },
      reverse: true,
      text: richtext_2,
    },
  },
  {
    type: "image_text",
    value: {
      image: {
        alt: "image 3",
        url: cardImage,
      },
      reverse: false,
      text: richtext_2,
    },
  },
  {
    type: "thumbnail_gallery",
    value: [
      {
        url: cardImage,
      },
      {
        url: cardImage2,
      },
      {
        url: cardImage3,
      },
      {
        url: cardImage2,
      },
      {
        url: cardImage,
      },
    ],
  },
  {
    type: "slider",
    value: [
      {
        type: "image_carousel",
        value: [
          {
            url: cardImage2,
          },
          {
            url: cardImage3,
          },
          {
            url: cardImage2,
          },
        ],
      },
      {
        type: "animated_slider",
        value: [
          {
            title: "Slider 1",
            description:
              "<p>&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>",
            button_text: "button 1",
            button: 3,
            image: {
              url: cardImage,
              width: 640,
              height: 427,
              alt: "tim-marshall-cAtzHUz7Z8g-unsplash.jpg",
            },
          },
          {
            title: "Slider 2",
            description:
              "<p>&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>",
            button_text: "button 2",
            button: 4,
            image: {
              url: cardImage3,
              width: 640,
              height: 427,
              alt: "image 2",
            },
          },
        ],
      },
    ],
  },
];

// HomePage.js
const mockHomePage = (mockAxios) => {
  mockAxios.onGet("/api/cms/pages/6/").reply(200, {
    id: 6,
    title: "Home Page",
    pub_date: 1597720114000,
    body: mockHomePageStreamFieldData,
  });
};

// PostDetail.js
const mockPost = (mockAxios) => {
  // Posts List
  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=*`)
    .reply(200, {
      results: [{ id: 1 }, { id: 2 }],
      count: 4,
    });
  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=2&category=*&tag=*`)
    .reply(200, {
      results: [{ id: 3 }, { id: 4 }],
      count: 4,
    });
  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=react`)
    .reply(200, {
      results: [{ id: 2 }, { id: 4 }],
      count: 2,
    });
  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=wagtail`)
    .reply(200, {
      results: [],
      count: 0,
    });
  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=*&tag=django`)
    .reply(200, {
      results: [],
      count: 0,
    });

  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=programming&tag=*`)
    .reply(200, {
      results: [{ id: 1 }, { id: 3 }],
      count: 2,
    });
  mockAxios
    .onGet(`/api/blog/posts/?limit=2&offset=0&category=life&tag=*`)
    .reply(200, {
      results: [],
      count: 0,
    });

  // Post
  mockAxios.onGet("/api/cms/pages/1/").reply(200, {
    id: 1,
    title: "Post Page 1",
    excerpt: "tag: event",
    header_image_url: {
      url: cardImage2,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597022114000,
    body: mockStreamFieldData,
  });

  mockAxios.onGet("/api/cms/pages/2/").reply(200, {
    id: 2,
    title: "Post Page 2",
    excerpt: "tag: event",
    header_image_url: {
      url: cardImage2,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597020114000,
    body: mockStreamFieldData,
  });

  mockAxios.onGet(`/api/cms/pages/3/`).reply(200, {
    id: 3,
    title: "Post Page  3",
    excerpt: "category: programming",
    header_image_url: {
      url: cardImage,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114002,
    body: mockStreamFieldData,
  });

  mockAxios.onGet(`/api/cms/pages/4/`).reply(200, {
    id: 4,
    title: "Post Page 4",
    excerpt: "tag: react",
    header_image_url: {
      url: cardImage,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114002,
    body: mockStreamFieldData,
  });

  mockAxios.onGet("/api/cms/pages/5/").reply(200, {
    id: 5,
    title: "Post Page 5",
    excerpt: "category: programming",
    header_image_url: {
      url: cardImage,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114000,
    body: mockStreamFieldData,
  });
};

// Tag.js
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

// Category.js
const mockCategory = (mockAxios) => {
  const API_REQUEST = "/api/blog/categories/";

  mockAxios.onGet(API_REQUEST).reply(2000, {
    results: [
      {
        slug: "programming",
        name: "Programming",
      },
      {
        slug: "life",
        name: "Life",
      },
    ],
  });
};

export {
  mockTag,
  mockStreamFieldData,
  mockHomePageStreamFieldData,
  mockPost,
  mockCategory,
  mockHomePage,
};
