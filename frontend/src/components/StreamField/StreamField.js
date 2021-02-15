import React from "react";
import { sanitize } from "dompurify";
import { ThumbnailGallery } from "./ThumbnailGallery";
import { ImageText } from "./ImageText";
import { ImageCarousel } from "./ImageCarousel";

function StreamField(props) {
  // We build a StreamField Component, which iterate the props.value
  const streamField = props.value;
  let html = [];

  for (let i = 0; i < streamField.length; i++) {
    const field = streamField[i];

    // Decide which block component should be used according to the block type
    switch (field.type) {
      case "h1":
        html.push(
          <div key={`${i}.${field.type}`}>
            <h1>{field.value}</h1>
          </div>
        );
        break;
      case "h2":
        html.push(
          <div key={`${i}.${field.type}`}>
            <h2>{field.value}</h2>
          </div>
        );
        break;
      case "paragraph":
        html.push(
          <div key={`${i}.${field.type}`}>
            <div
              dangerouslySetInnerHTML={{ __html: `${sanitize(field.value)}` }}
            />
          </div>
        );
        break;
      case "thumbnail_gallery":
        html.push(
          // pass field.value to the child Component props,
          // so they would use the field.value to render HTML.
          // The key is used to distinguish child in a list React keys
          <ThumbnailGallery value={field.value} key={`${i}.${field.type}`} />
        );
        break;
      case "image_text":
        html.push(
          // pass field.value to the child Component props,
          // so they would use the field.value to render HTML.
          // The key is used to distinguish child in a list React keys
          <ImageText value={field.value} key={`${i}.${field.type}`} />
        );
        break;
      case "image_carousel":
        html.push(
          // pass field.value to the child Component props,
          // so they would use the field.value to render HTML.
          // The key is used to distinguish child in a list React keys
          <ImageCarousel value={field.value} key={`${i}.${field.type}`} />
        );
        break;
      default:
        html.push(<div className={field.type} key={`${i}.${field.type}`} />);
    }
  }

  return html;
}

export { StreamField };
