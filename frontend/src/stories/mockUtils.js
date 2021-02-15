import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import cardImage from "./assets/image_1.jpg";
import cardImage2 from "./assets/image_2.jpg";
import cardImage3 from "./assets/image_3.jpg";

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
];

export { mockTag, mockStreamFieldData };
