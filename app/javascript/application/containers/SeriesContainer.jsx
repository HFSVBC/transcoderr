import React, { Component } from 'react';
import {CContainer} from '@coreui/react';

class SeriesContainer extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return(
      <main className="c-main">
        <CContainer fluid>
          <p>Series</p>
        </CContainer>
      </main>
    )
  }
}

export default SeriesContainer;
