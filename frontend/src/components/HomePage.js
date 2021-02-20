import React from "react";
import axios from "axios";
import { StreamField } from "./StreamField/StreamField";

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

    axios.get(`/api/cms/pages/${pk}/`).then((res) => {
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
        <div className="col-12">
          <StreamField value={home_page.body} />
        </div>
      );
    } else {
      return <div className="col-md-8">Loading...</div>;
    }
  }
}

export { HomePage };
