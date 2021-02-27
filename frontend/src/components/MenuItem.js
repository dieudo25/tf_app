import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function MenuItem(props) {
  const [linkPage, setLinkPage] = useState("#");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/cms/pages/${props.item.link_page}/`).then((res) => {
      setLinkPage(res.data.meta);
      setLoading(false);
    });
  });

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <Link to={linkPage.type === "home.HomePage" ? "/" : `/${linkPage.slug}`}>
        {props.item.link_title}
      </Link>
    );
  }
}

export { MenuItem };
