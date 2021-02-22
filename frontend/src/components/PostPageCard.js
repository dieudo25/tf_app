import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;

class PostPageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(`/api/cms/pages/${this.props.postPk}/`).then((res) => {
      this.setState({
        data: res.data,
        loading: false,
      });
    });
  }

  renderPost(data) {
    const dateStr = new Date(data.pub_date).toLocaleString();

    return (
      <div className="card mb-4" style={{ height: "600px" }}>
        <Link to={`/post/${data.id}`}>
          <img
            src={data.header_image_url.url}
            className="card-img-top"
            alt=""
            style={{ height: "400px" }}
          />
        </Link>
        <div className="card-body">
          <h2 className="card-tite">
            <Link to={`/post/${data.id}`}>{data.title}</Link>
          </h2>
          <p className="card-text">{data.excerpt}</p>
          <Link to={`/post/${data.id}`} className="btn btn-primary">
            Read More →
          </Link>
        </div>
        <div className="card-footer text-muted">Posted on {dateStr}</div>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Centered>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Centered>
      );
    } else {
      return this.renderPost(this.state.data);
    }
  }
}

export { PostPageCard };
