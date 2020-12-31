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

const defaultConnectionParameters = { name: "", provider: "", host: "", port: 443, api_key: "", ssl: true };

class ConnectContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeConnection: defaultConnectionParameters,
      connections: [],
      isConnectionModalOpen: false,
      isNewConnection: false
    };

    this.handleConnectionClick = this.handleConnectionClick.bind(this);
    this.handleConnectionModalToggle = this.handleConnectionModalToggle.bind(this);
    this.handleNewConnectionClick = this.handleNewConnectionClick.bind(this);
    this.handleActiveConnectionChange = this.handleActiveConnectionChange.bind(this);
    this.handleCreateConnectionClick = this.handleCreateConnectionClick.bind(this);
    this.handleTestConnectionClick = this.handleTestConnectionClick.bind(this);
    this.handleUpdateConnectionClick = this.handleUpdateConnectionClick.bind(this);
    this.handleDeleteConnectionClick = this.handleDeleteConnectionClick.bind(this);
  };

  componentDidMount(){
    Client.getConnections()
      .then(response => response.data.data)
      .then(connections => this.setState({ connections: connections }))
  }

  handleConnectionClick(connection) {
    Client.getConnection(connection)
      .then(response => response.data.data)
      .then(connection => this.setState({
        activeConnection: connection,
        isConnectionModalOpen: true,
        isNewConnection: false
      }));
  }

  handleNewConnectionClick() {
    this.setState({
      activeConnection: defaultConnectionParameters,
      isConnectionModalOpen: true,
      isNewConnection: true
    })
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

  handleCreateConnectionClick() {
    Client.createConnection(this.state.activeConnection)
      .then(response => {
        this.setState({activeConnection: defaultConnectionParameters, isConnectionModalOpen: false})
        this.componentDidMount();
        console.log("CreateConnection - Successful", response)
      })
      .catch(error => {
        console.log("CreateConnection - Error", error)
      });
  }

  handleTestConnectionClick() {
    Client.testConnection(this.state.activeConnection)
      .then(response => {
        console.log("TestConnection - Successful", response)
      })
      .catch(error => {
        console.log("TestConnection - Error", error)
      });
  }

  handleUpdateConnectionClick() {
    Client.updateConnection(this.state.activeConnection)
      .then(response => {
        this.setState({activeConnection: defaultConnectionParameters, isConnectionModalOpen: false})
        this.componentDidMount();
        console.log("UpdateConnection - Successful", response)
      })
      .catch(error => {
        console.log("UpdateConnection - Error", error)
      });
  }

  handleDeleteConnectionClick() {
    Client.deleteConnection(this.state.activeConnection)
      .then(response => {
        this.setState({activeConnection: defaultConnectionParameters, isConnectionModalOpen: false})
        this.componentDidMount();
        console.log("DeleteConnection - Successful", response)
      })
      .catch(error => {
        console.log("DeleteConnection - Error", error)
      });
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
                icon={<i className="fas fa-plus card-icon"/>}
                onConnectionClick={() => {this.handleNewConnectionClick()}}
              />
            </CCol>
          </CRow>
        </CContainer>
          <ConnectionModal
            connection={this.state.activeConnection}
            isNew={this.state.isNewConnection}
            isOpen={this.state.isConnectionModalOpen}
            toggle={this.handleConnectionModalToggle}
            handleActiveConnectionChange={this.handleActiveConnectionChange}
            onSubmitClick={this.state.isNewConnection ? this.handleCreateConnectionClick : this.handleUpdateConnectionClick}
            onTestClick={this.handleTestConnectionClick}
            onDeleteClick={this.handleDeleteConnectionClick}
          />
      </main>
    )
  }
}

export default ConnectContainer;
