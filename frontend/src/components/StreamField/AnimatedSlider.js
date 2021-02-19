// You can live edit this code below the import statements
import React from "react";

import { sanitize } from "dompurify";

import { Carousel, Button } from "react-bootstrap";

import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

/* function AnimatedSlider(props) {
  return (
    <div>
      <Carousel>
        {props.value.map((item, index) => (
          <Carousel.Item key={`${index}.${item}`}>
            <img className="d-block text-center w-100" src={item.url} alt="" />
            <Carousel.Caption>
              <Fade>
                <h3>{item.title}</h3>
              </Fade>
              <Fade>
                <p>{item.description}</p>
              </Fade>
              <Button variant="outline-primary">{item.button_text}</Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
} */

function AnimatedSlider(props) {
  return (
    <div>
      <Carousel>
        {props.value.map((item, index) => (
          <Carousel.Item key={`${index}.${item}`}>
            <img
              className="d-block text-center w-100"
              src={item.image.url}
              alt=""
            />
            <Carousel.Caption>
              <Fade>
                <h3>{item.title}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${sanitize(item.description)}`,
                  }}
                />
                <Button variant="outline-light">CTA {index + 1}</Button>
              </Fade>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export { AnimatedSlider };
