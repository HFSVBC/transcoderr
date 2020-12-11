import React, { Component } from 'react';
import {CContainer} from "@coreui/react";

class VideosContainer extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return(
      <main className="c-main">
        <CContainer fluid>
          <p>Videos</p>
        </CContainer>
      </main>
    )
  }
}

export default VideosContainer;
