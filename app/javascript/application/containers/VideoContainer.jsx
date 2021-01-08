import React, { Component } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardHeader,
  CCardBody
} from "@coreui/react";

import Toaster from "../components/Toaster";

import Client from '../../Client';
import Helpers from '../../Helpers';

class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null,
      toasters: []
    }

    this.handleTranscodeClick = this.handleTranscodeClick.bind(this);
  };

  addToast(title, message) {
    this.setState(prevState => (
      { toasters: [...prevState.toasters, { title: title, message: message }] }
    ));
  }

  componentDidMount() {
    Client.getMovie(this.props.id)
      .then(response => response.data.data)
      .then(movie => {
        this.setState({movie: movie})
      });
  }

  handleTranscodeClick() {
    const toasterTitle = "Movie Transcode - " + this.state.movie.title;
    Client.transcodeMovie(this.state.movie)
      .then(response => {
        this.addToast(toasterTitle, response.data.message);
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  toasters() {
    return this.state.toasters.map((toast, key) => {
      return(
        <Toaster
          key={key}
          title={toast.title}
          message={toast.message}
        />
      )
    });
  }

  render() {
    let movie = this.state.movie;

    return (
      <div>
        {movie !== null &&
          <main className="c-main">
            <CContainer fluid>
              <nav className="position-relative no-frame" style={{zIndex: 0}}>
                <div className="position-absolute bg-gray-600 h-100 w-100" style={{zIndex: -1}}/>
                <div className="px-3 py-2">
                  <CButton block color="primary w-auto" title="transcode" onClick={() => {this.handleTranscodeClick()}}>
                    <i className="fas fa-microchip"></i>
                  </CButton>
                </div>
              </nav>
              <header className="position-relative no-frame-x" style={{zIndex: 0}}>
                <div className="background-cover position-absolute h-100 w-100" style={{backgroundImage: `url(${movie.fanart})`, zIndex: -1}}>
                  <div className="background-overlay"/>
                </div>
                <div className="p-3 text-light">
                  <CRow>
                    <CCol xs="12" md="3" lg="2">
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

            {this.toasters()}
          </main>
        }
      </div>
    )
  }
}

export default VideoContainer;
