// You can live edit this code below the import statements
import React from "react";

import { sanitize } from "dompurify";

import { Carousel, Button } from "react-bootstrap";

import Fade from "react-reveal/Fade";

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
              </Fade>
              <Fade delay={1000}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${sanitize(item.description)}`,
                  }}
                />
                <Button variant="light">CTA {index + 1}</Button>
              </Fade>
              <Fade delay={1500}></Fade>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export { AnimatedSlider };
