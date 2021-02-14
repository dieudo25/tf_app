import React from "react";
import "../index.scss";

class TagWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      loading: true,
    };
  }

  componentDidMount() {
    const tags = [
      {
        slug: "wagtail",
        name: "Wagtail",
      },
      {
        slug: "django",
        name: "Django",
      },
      {
        slug: "react",
        name: "React",
      },
    ];

    this.setState({
      tags,
      loading: false,
    });
  }

  render() {
    let content;
    if (this.state.loading) {
      content = "loading...";
    } else {
      content = this.state.tags.map((tag) => (
        <a href={`/tag/${tag.slug}`} key={tag.slug}>
          <span className="badge badge-secondary">{tag.name}</span>{" "}
        </a>
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
