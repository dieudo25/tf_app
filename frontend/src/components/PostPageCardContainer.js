import React from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import _ from "lodash";

import { PostPageCard } from "./PostPageCard";

class PostPageCardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageCount: 0,
      pageStep: 2,
    };
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getCurPage() {
    // return the page number from the url
    const page = this.props.match.params.page;
    return page === undefined ? 1 : parseInt(page);
  }

  getPrevPageUrl() {
    // Get the previous page url

    // Shallow copy of the props match params value
    //  _.clone() doesn’t copy deeply it just passed the reference
    // So if the original value change target change too
    // (but not otherwise)
    const target = _.clone(this.props.match.params);
    target.page = this.getCurPage() - 1;

    // generatePath can help us generate the link url
    // from the react router match path and match.params.
    // Like the django reverse url
    // First param => String pattern for the path
    // Second param => Object with corresponding params for pattern to use
    return generatePath(this.props.match.path, target);
  }

  getNextPageUrl() {
    // Get the next page url

    const target = _.clone(this.props.match.params);
    target.page = this.getCurPage() + 1;
    return generatePath(this.props.match.path, target);
  }

  getPosts() {
    // Get the posts with ajax request

    // Filter with category if props match params category value is set
    let category =
      this.props.match.params.category === undefined
        ? "*"
        : this.props.match.params.category;

    // Filter with tag if props match params tag value is set
    let tag =
      this.props.match.params.tag === undefined
        ? "*"
        : this.props.match.params.tag;

    // Define the number of posts to offset (ignore)
    let offset = (this.getCurPage() - 1) * this.state.pageStep;

    // Define the url with all the filter and representation data
    const url = `/api/blog/posts/?limit=${this.state.pageStep}&offset=${offset}&category=${category}&tag=${tag}`;

    // Get posts with axios request (AJAX)
    axios.get(url).then((res) => {
      const posts = res.data.results;

      // Update the state of the component
      this.setState({
        posts,
        // pageCount equals the rounded up number of posts
        // divided by the number of pageStep (post to show)
        pageCount: Math.ceil(parseInt(res.data.count) / this.state.pageStep),
      });
    });
  }

  render() {
    return (
      <Col md={8}>
        {this.state.posts.map((post) => (
          <PostPageCard postPk={post.id} key={post.id} />
        ))}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={
                this.getCurPage() <= 1 ? "page-item disabled" : "page-item"
              }
            >
              <Link to={this.getPrevPageUrl()} className="page-link">
                Previous
              </Link>
            </li>
            <li
              className={
                this.getCurPage() >= this.state.pageCount
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <Link to={this.getNextPageUrl()} className="page-link">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </Col>
    );
  }
}

export { PostPageCardContainer };
