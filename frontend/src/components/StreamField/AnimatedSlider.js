// You can live edit this code below the import statements
import React from "react";

import Slider from "react-slick";
import "../../_slick.scss";
import "../../_slickTheme.scss";
import styled from "styled-components";
import { AnimatedSliderItem } from "./AnimatedSliderItem";

const slick = {
  autoplay: false,
  speed: 800,
  arrows: false,
  dots: true,
  fade: true,

  /* infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  lazyLoad: "ondemand",
  cssEase: "linear",
  swipe: true, */
};

const bannerAreaStyle = {
  height: "100vh",
};

function AnimatedSlider(props) {
  return (
    <div>
      <Slider style={bannerAreaStyle} className="banner-area" {...slick}>
        {props.value.map((item, index) => (
          <AnimatedSliderItem item={item} key={item.title + "." + index} />
        ))}
      </Slider>
    </div>
  );
}

export { AnimatedSlider };
