import React, { Component } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CTabs,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink
} from "@coreui/react";

import MovieModal from "../components/MovieModal";
import Toaster from "../components/Toaster";

import Client from '../../Client';
import Helpers from '../../Helpers';

const movieHistoryColumnDefinitions = [
  { headerName: 'Action', field: 'action', width: 130 },
  { headerName: 'Finished At', field: 'finished_at', type: 'dateColumn' },
  {
    headerName: "Previous Media",
    children: [
      { headerName: 'Video Codec', field: 'metadata.old_media.video_codec', width: 150 },
      { headerName: 'Audio Codec', field: 'metadata.old_media.audio_codec', width: 150 },
      { headerName: 'Resolution', field: 'metadata.old_media.resolution', width: 150 },
      { headerName: 'Size', field: 'metadata.old_media.size', width: 150 },
    ]
  },
  { headerName: 'Job ID', field: 'metadata.job_id', width: 250 },
  { headerName: 'Created At', field: 'created_at', type: 'dateColumn' },
];

const movieHistoryDefaultColDef = {
  filter: 'agTextColumnFilter',
  sortable: true,
  resizable: true,
  width: 200
}

const columnTypes = {
  dateColumn: {
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateParts = cellValue.split('/');
        var day = Number(dateParts[0]);
        var month = Number(dateParts[1]) - 1;
        var year = Number(dateParts[2]);
        var cellDate = new Date(year, month, day);
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        } else {
          return 0;
        }
      },
    },
  }
}

class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMovieNew: false,
      isMovieModalOpen: false,
      movie: null,
      movieActivities: [],
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
    Client.getMovieActivities(this.props.id)
      .then(response => response.data.data)
      .then(movieActivities => {
        this.setState({movieActivities: movieActivities})
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

  onHistoryGridReady(params) {
    console.log(params)
    // params.api.sizeColumnsToFit();
    // params.columnApi.autoSizeColumns();
    //
    // var allColumnIds = [];
    // params.gridOptions.columnApi.getAllColumns().forEach(function (column) {
    //   allColumnIds.push(column.colId);
    // });
    //
    // params.gridOptions.columnApi.autoSizeColumns(allColumnIds, false);
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
        <main className="c-main d-flex">
          {movie !== null &&
            <>
              <CContainer fluid className="align-self-stretch d-flex flex-column">
                <nav className="position-relative no-frame" style={{zIndex: 0}}>
                  <div className="position-absolute bg-gray-600 h-100 w-100" style={{zIndex: -1}}/>
                  <div className="px-3 py-2 d-flex bd-highlight">
                    <CButton className="m-1" color="primary" title="transcode" onClick={() => {this.handleTranscodeClick()}}>
                      <i className="fas fa-microchip"></i>
                    </CButton>
                    <span className="m-1 border border-top-0 border-bottom-0"/>
                    <CButton className="m-1" color="primary" title="edit" onClick={() => {this.handleMovieEditClick()}}>
                      <i className="fas fa-pencil-alt"></i>
                    </CButton>
                    <CButton className="m-1" color="danger" title="transcode" onClick={() => {this.handleDeleteMovieClick()}}>
                      <i className="fas fa-trash-alt"></i>
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
                <div className="content mt-3 h-100 d-flex flex-column">
                  <CTabs activeTab="history">
                    <CNav variant="pills">
                      <CNavItem>
                        <CNavLink data-tab="history">
                          History
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink data-tab="files">
                          Files
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <CTabContent className="d-flex h-100">
                      <CTabPane data-tab="history" className="flex-fill w-100">
                        <div className="ag-theme-material my-3 w-100" style={{height: "93%", minHeight: "400px", maxWidth: "100%"}}>
                          <AgGridReact
                            rowData={this.state.movieActivities}
                            columnDefs={movieHistoryColumnDefinitions}
                            defaultColDef={movieHistoryDefaultColDef}
                            columnTypes={columnTypes}
                            onGridReady={this.onHistoryGridReady}
                            pagination={true}
                            paginationPageSize={10}
                            suppressHorizontalScroll={false}
                          />
                        </div>
                      </CTabPane>
                      <CTabPane data-tab="files" className="flex-fill">
                        <h3 className="pt-4">Files</h3>
                      </CTabPane>
                    </CTabContent>
                  </CTabs>
                </div>
              </CContainer>

              <MovieModal
                isNew={this.state.isMovieNew}
                isOpen={this.state.isMovieModalOpen}
                movie={movie}
                profiles={this.state.profiles}
                toggle={this.handleMovieModalToggle}
                handleActiveMovieChange={this.handleMovieChange}
                onSubmitClick={this.handleUpdateMovieClick}
              />
            </>
          }
          {this.toasters()}
        </main>
    )
  }
}

export default VideoContainer;
