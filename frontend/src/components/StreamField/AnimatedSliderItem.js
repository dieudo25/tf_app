import React, { useState, useEffect } from "react";
import axios from "axios";
import { sanitize } from "dompurify";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SlideItem = styled.div`
  height: 100vh;
  position: relative;
`;
const SlideItemImgContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;
const SlideItemImg = styled.img`
  width: 100%;
  height: 100vh;
`;
const SlideItemText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
const SlideItemTextTitle = styled.h2`
  font-size: 55px;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  margin: 0;
`;
const slideItemTextParaph = { color: "#fff" };
const SliderItemTextButtonStyle = {
  textDecoration: "none",
  background: "crimson",
  color: "#fff",
  padding: "15px 25px",
  display: "inline-block",
  textTransform: "uppercase",
};

function AnimatedSliderItem(props) {
  const [slug, setSlug] = useState("#");
  console.log(props.item.meta);

  useEffect(() => {
    axios.get(`/api/cms/pages/${props.item.button}/`).then((res) => {
      setSlug(res.data.meta.slug);
    });
  });

  return (
    <SlideItem className="single-banner">
      <SlideItemImgContainer className="banner-img">
        <SlideItemImg src={props.item.image.url} alt=""></SlideItemImg>
      </SlideItemImgContainer>
      <SlideItemText className="banner-text">
        <SlideItemTextTitle>{props.item.title}</SlideItemTextTitle>
        <div
          style={slideItemTextParaph}
          dangerouslySetInnerHTML={{
            __html: `${sanitize(props.item.description)}`,
          }}
        />
        <div className="banner-btn">
          <Link
            style={SliderItemTextButtonStyle}
            to={slug === "homepage" ? "/" : `/${slug}`}
          >
            {props.item.button_text}
          </Link>
        </div>
      </SlideItemText>
    </SlideItem>
  );
}

export { AnimatedSliderItem };
