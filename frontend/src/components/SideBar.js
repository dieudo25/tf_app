import React from "react";
import { Col } from "react-bootstrap";
import { TagWidget } from "./TagWidget";

function SideBar(props) {
  return (
    <Col md={4}>
      <TagWidget />
    </Col>
  );
}

export { SideBar };
