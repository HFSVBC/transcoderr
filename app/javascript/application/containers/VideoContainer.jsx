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

import MovieModal from "../components/MovieModal";
import Toaster from "../components/Toaster";

import Client from '../../Client';
import Helpers from '../../Helpers';

class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMovieNew: false,
      isMovieModalOpen: false,
      movie: null,
      profiles: [],
      toasters: []
    }

    this.handleMovieModalToggle = this.handleMovieModalToggle.bind(this);
    this.handleMovieEditClick = this.handleMovieEditClick.bind(this);
    this.handleMovieChange = this.handleMovieChange.bind(this);
    this.handleUpdateMovieClick = this.handleUpdateMovieClick.bind(this);
    this.handleDeleteMovieClick = this.handleDeleteMovieClick.bind(this);
    this.handleTranscodeClick = this.handleTranscodeClick.bind(this);
  };

  componentDidMount() {
    Client.getMovie(this.props.id)
      .then(response => response.data.data)
      .then(movie => {
        this.setState({movie: movie})
      });
  }

  addToast(title, message) {
    this.setState(prevState => (
      { toasters: [...prevState.toasters, { title: title, message: message }] }
    ));
  }

  handleMovieModalToggle() {
    this.setState({
      isMovieModalOpen: !this.state.isMovieModalOpen,
    });
  }

  handleMovieEditClick() {
    Client.getProfiles()
      .then(response => response.data.data)
      .then(profiles => {
        this.setState({
          profiles: profiles.map(profile => {
            return({ value: profile.id, label: profile.name })
          }),
          isMovieModalOpen: true
        })
      })
  }

  handleMovieChange(movieProperty, newValue) {
    console.log(newValue)
    this.setState(prevState => (
      { movie: { ...prevState.movie, [movieProperty]: newValue } }
    ));
  }

  handleUpdateMovieClick() {
    const toasterTitle = "Movie Update - " + this.state.movie.name;
    Client.updateMovie(this.state.movie)
      .then(response => {
        this.setState({movie: response.data.data, isMovieModalOpen: false})
        this.componentDidMount();
        this.addToast(toasterTitle, "Movie successfully updated");
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  handleDeleteMovieClick() {
    const toasterTitle = "Movie Delete - " + this.state.movie.name;
    Client.deleteMovie(this.state.movie)
      .then(response => {
        this.setState({movie: null, isMovieModalOpen: false})
        this.addToast(toasterTitle, response.data.message);
        this.props.history.push("/videos")
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
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
                <div className="px-3 py-2 d-flex bd-highlight">
                  <CButton className="m-1" color="primary" title="edit" onClick={() => {this.handleMovieEditClick()}}>
                    <i className="fas fa-pencil-alt"></i>
                  </CButton>
                  <CButton className="m-1" color="danger" title="transcode" onClick={() => {this.handleDeleteMovieClick()}}>
                    <i className="fas fa-trash-alt"></i>
                  </CButton>
                  <CButton className="m-1 ml-auto" color="primary" title="transcode" onClick={() => {this.handleTranscodeClick()}}>
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

            <MovieModal
              isNew={this.state.isMovieNew}
              isOpen={this.state.isMovieModalOpen}
              movie={this.state.movie}
              profiles={this.state.profiles}
              toggle={this.handleMovieModalToggle}
              handleActiveMovieChange={this.handleMovieChange}
              onSubmitClick={this.handleUpdateMovieClick}
            />

            {this.toasters()}
          </main>
        }
      </div>
    )
  }
}

export default VideoContainer;
