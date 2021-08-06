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

class SeriesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      totalPages: null,
      loadMore: true
    }

    this.handleLoadMore = this.handleLoadMore.bind(this);
  };

  handleLoadMore(page) {
    Client.getSeries(page)
      .then(response => {
        this.setState(prevState => ({
          series: [...prevState.series, ...response.data.data],
          totalPages: response.headers["total-pages"]
        }))
      })
      .then(() => {
        this.setState({loadMore: page + 1 < this.state.totalPages })
      })
  }

  series() {
    return this.state.series.map((serie) => {
      return(
        <CCol key={serie.id}xs="6" sm="4" md="2">
          <Link to={`/series/${serie.id}`} className="text-body text-decoration-none">
            <CCard>
              <img src={serie.poster} className="card-img-top" alt={serie.name} />
              <CCardBody className="text-center">
                {/*{movie.metadata.video_codec}<br/>*/}
                {/*{Helpers.bytesToSize(movie.metadata.size)}*/}
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
        <Header />
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.handleLoadMore}
                hasMore={this.state.loadMore}
              >
                <CRow>
                  {this.series()}
                </CRow>
              </InfiniteScroll>
            </CContainer>
          </main>
        </div>
      </>
    )
  }
}

export default SeriesContainer;
