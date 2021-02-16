import React from "react";

import axios from "axios";

import { Link } from "react-router-dom";

class TagWidget extends React.Component {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      tags: [],
      loading: true,
    };
  }

  componentDidMount() {
    // Send Ajax request
    axios.get("/api/blog/tags/").then((res) => {
      let tags = res.data.results;
      // Set fetched data to the component state
      this.setState({
        tags,
        loading: false,
      });
    });
  }

  render() {
    let content;
    if (this.state.loading) {
      content = "Loading...";
    } else {
      content = this.state.tags.map((tag) => (
        <Link to={`/tag/${tag.slug}`} key={tag.slug}>
          <span className="badge badge-secondary">{tag.name}</span>{" "}
        </Link>
      ));
    }
    return (
      <div className="card my-4">
        <h5 className="card-header">Tags</h5>
        <div className="card-body">{content}</div>
      </div>
    );
  }
}

export { TagWidget };
