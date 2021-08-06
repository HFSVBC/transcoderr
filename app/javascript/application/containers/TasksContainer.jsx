import React, { Component } from 'react';
import {
  CLink,
  CContainer
} from "@coreui/react";

import Header from "../components/Header";

class SeriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  };

  render() {
    return(
      <>
        <Header sidebarShow={this.props.sidebarShow} setSidebarShow={this.props.setSidebarShow}>
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="/sidekiq">
              Sidekiq
            </CLink>
          </div>
        </Header>
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid>

            </CContainer>
          </main>
        </div>
      </>
    )
  }
}

export default SeriesContainer;
