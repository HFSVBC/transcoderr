import React, { Component } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from "@coreui/react";

import Client from '../../Client';
import Helpers from '../../Helpers';

class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null,
    }
  };

  componentDidMount() {
    Client.getMovie(this.props.id)
      .then(response => response.data.data)
      .then(movie => {
        this.setState({movie: movie})
      });
  }

  render() {
    let movie = this.state.movie;

    return (
      <div>
        {movie !== null &&
          <main className="c-main">
            <CContainer fluid>
              <header className="position-relative no-frame" style={{zIndex: 0}}>
                <div className="background-cover position-absolute h-100 w-100" style={{backgroundImage: `url(${movie.fanart})`, zIndex: -1}}>
                  <div className="background-overlay"/>
                </div>
                <div className="p-3 text-light">
                  <CRow>
                    <CCol xs="12" md="2">
                      <img src={movie.poster} className="card-img-top" alt={movie.name} />
                    </CCol>
                    <CCol>
                      <h1>{movie.name}</h1>
                      <div className="d-flex flex-row">
                        <div>
                          <label className="text-secondary text-small">Video Codec</label>
                          <p>{movie.metadata.video_codec}</p>
                        </div>
                        <div className="mx-2">
                          <label className="text-secondary text-small">Resolution</label>
                          <p>{movie.metadata.resolution}</p>
                        </div>
                        <div className="mx-2">
                          <label className="text-secondary text-small">Size</label>
                          <p>{Helpers.bytesToSize(movie.metadata.size)}</p>
                        </div>
                      </div>
                      <p>{Helpers.truncateString(movie.overview, 420)}</p>
                    </CCol>
                  </CRow>
                </div>
              </header>
              <div>
                <h3 className="pt-4">History</h3>
              </div>
            </CContainer>
          </main>
        }
      </div>
    )
  }
}

export default VideoContainer;
