import React, { Component } from 'react';
import {
  CCol,
  CContainer,
  CRow
} from "@coreui/react";

import ConnectionModal from '../components/ConnectionModal';
import ConnectionWidget from '../components/ConnectionWidget';

import Client from '../../Client';
import Helpers from '../../Helpers';

class ConnectContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeConnection: null,
      connections: [],
      isConnectionModalOpen: false
    };

    this.handleConnectionClick = this.handleConnectionClick.bind(this);
    this.handleConnectionModalToggle = this.handleConnectionModalToggle.bind(this);
    this.handleActiveConnectionChange = this.handleActiveConnectionChange.bind(this);
    this.handleUpdateConnectionClick = this.handleUpdateConnectionClick.bind(this);
  };

  componentDidMount(){
    Client.getConnections()
      .then(response => response.data.data)
      .then(connections => this.setState({ connections: connections }))
  }

  handleConnectionClick(connection) {
    Client.getConnection(connection.id)
      .then(response => response.data.data)
      .then(c => this.setState({ activeConnection: c, isConnectionModalOpen: true }));
  }

  handleConnectionModalToggle() {
    this.setState({
      isConnectionModalOpen: !this.state.isConnectionModalOpen,
    });
  }

  handleActiveConnectionChange(connectionProperty, newValue) {
    this.setState(prevState => (
      { activeConnection: { ...prevState.activeConnection, [connectionProperty]: newValue } }
    ));
  }

  handleUpdateConnectionClick() {
    Client.updateConnection(this.state.activeConnection)
      .then(response => console.log(response))
  }

  connections() {
    return this.state.connections.map((connection) => {
      return(
        <CCol key={connection.id} xs="12" sm="6" lg="3">
          <ConnectionWidget
            text={connection.name}
            icon={Helpers.connectionLogo(connection.provider)}
            onConnectionClick={() => {this.handleConnectionClick(connection)}}
          />
        </CCol>
      )
    });
  }

  render() {
    return(
      <main className="c-main">
        <CContainer fluid>
          <CRow>
            {this.connections()}

            <CCol xs="12" sm="6" lg="3">
              <ConnectionWidget
                text="New"
                icon={<i className="fas fa-plus card-icon"/>} />
            </CCol>
          </CRow>
        </CContainer>
        {
          this.state.activeConnection &&
          <ConnectionModal
            connection={this.state.activeConnection}
            isOpen={this.state.isConnectionModalOpen}
            toggle={this.handleConnectionModalToggle}
            handleActiveConnectionChange={this.handleActiveConnectionChange}
            onSubmitClick={this.handleUpdateConnectionClick}
          />
        }
      </main>
    )
  }
}

export default ConnectContainer;
