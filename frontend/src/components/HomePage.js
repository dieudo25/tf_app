import React from "react";
import axios from "axios";
import { TopNavBar } from "./TopNavBar";
import { StreamField } from "./StreamField/StreamField";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Centered = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // We build a class component because
    // we need to send Ajax request in componentDidMount method.
    const pk = this.props.match.params.id;

    axios.get(`/api/cms/pages/5/`).then((res) => {
      const home_page = res.data;
      this.setState({
        home_page,
        loading: false,
      });
    });
  }

  render() {
    if (!this.state.loading) {
      const home_page = this.state.home_page;

      return (
        <div>
          <TopNavBar />
          <StreamField value={home_page.body[0].value} />
        </div>
      );
    } else {
      return (
        <Centered>
          <Spinner
            animation="border"
            role="status"
            style={{ width: "10rem", height: "10rem" }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Centered>
      );
    }
  }
}

export { HomePage };
