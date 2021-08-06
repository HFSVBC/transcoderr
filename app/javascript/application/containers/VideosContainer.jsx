import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from "@coreui/react";

import Header from "../components/Header";

import Client from '../../Client';
import Helpers from '../../Helpers';

class VideosContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      totalPages: null,
      loadMore: true
    }

    this.handleLoadMore = this.handleLoadMore.bind(this);
  };

  handleLoadMore(page) {
    Client.getMovies(page)
      .then(response => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...response.data.data],
          totalPages: response.headers["total-pages"]
        }))
      })
      .then(() => {
        this.setState({loadMore: page + 1 < this.state.totalPages })
      })
  }

  movies() {
    return this.state.movies.map((movie) => {
      return(
        <CCol key={movie.id}xs="6" sm="4" md="2">
          <Link to={`/videos/${movie.id}`} className="text-body text-decoration-none">
            <CCard>
              <img src={movie.poster} className="card-img-top" alt={movie.name} />
              <CCardBody className="text-center">
                {movie.metadata.video_codec}<br/>
                {Helpers.bytesToSize(movie.metadata.size)}
              </CCardBody>
            </CCard>
          </Link>
        </CCol>
      )
    });
  }

  render() {
    return(
      <>
        <Header sidebarShow={this.props.sidebarShow} setSidebarShow={this.props.setSidebarShow}/>
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.handleLoadMore}
                hasMore={this.state.loadMore}
              >
                <CRow>
                  {this.movies()}
                </CRow>
              </InfiniteScroll>
            </CContainer>
          </main>
        </div>
      </>
    )
  }
}

export default VideosContainer;
