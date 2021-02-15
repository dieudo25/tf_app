import React from "react";
import axios from "axios";
import { StreamField } from "./StreamField/StreamField";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: true,
    };
  }

  componentDidMount() {
    // We build a class component because
    // we need to send Ajax request in componentDidMount method.
    axios.get("/api/cms/pages/5/").then((res) => {
      const post = res.data;
      this.setState({
        post,
        loading: false,
      });
    });
  }

  render() {
    if (!this.state.loading) {
      const post = this.state.post;

      return (
        <div className="col-md-8">
          <img
            src={post.header_image_url.url}
            className="img-fluid rounded"
            alt=""
          />
          <hr />
          <h1>{post.title}</h1>
          <hr />
          <StreamField value={post.body} />
        </div>
      );
    } else {
      return <div className="col-md-8">Loading...</div>;
    }
  }
}

export { PostDetail };
