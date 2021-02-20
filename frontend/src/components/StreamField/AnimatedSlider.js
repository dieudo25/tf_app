// You can live edit this code below the import statements
import React from "react";

import { sanitize } from "dompurify";

import { Carousel, Button } from "react-bootstrap";

import Fade from "react-reveal/Fade";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss";
import "react-awesome-slider/dist/styles.css";

const sliderItem = {
  display: "flex",
  zIndex: 2,
  alignItems: "flex-end",
  padding: "150px",
};

const bgImg = {
  position: "absolute",
  zIndex: -1,
  left: 0,
  top: 0,
  width: "100%",
};

const Caption = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  justifyContent: "flex-end",
  alignItems: "center",
};

const textStyle = {
  color: "white",
  textAlign: "center",
};

const buttonStyle = {};

const AutoplaySlider = withAutoplay(AwesomeSlider);

function AnimatedSlider(props) {
  return (
    <div>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={3000}
        animation="foldOutAnimation"
        cssModule={[CoreStyles, AnimationStyles]}
      >
        {props.value.map((item, index) => (
          <div style={sliderItem}>
            <div>
              <img
                style={bgImg}
                className="d-block text-center w-100"
                src={item.image.url}
                alt=""
              />
              <div style={Caption}>
                <Fade>
                  <h3 style={textStyle}>{item.title}</h3>
                </Fade>
                <Fade delay={1000}>
                  <div
                    style={textStyle}
                    dangerouslySetInnerHTML={{
                      __html: `${sanitize(item.description)}`,
                    }}
                  />
                  <Button style={buttonStyle} variant="light">
                    CTA {index + 1}
                  </Button>
                </Fade>
              </div>
            </div>
          </div>
        ))}
      </AutoplaySlider>
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
