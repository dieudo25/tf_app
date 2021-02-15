import React from "react";
import { Container, Row } from "react-bootstrap";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";
import { PostDetail } from "./PostDetail";

class PostPage extends React.Component {
  render() {
    return (
      <div>
        <TopNav />
        <Container>
          <Row>
            <PostDetail />
            <SideBar />
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export { PostPage };
