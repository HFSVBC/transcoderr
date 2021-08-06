import React, { Component } from 'react';
import {
  CCol,
  CContainer,
  CRow
} from "@coreui/react";

import ConnectionModal from '../components/ConnectionModal';
import Header from "../components/Header";
import Toaster from '../components/Toaster';
import Widget from '../components/Widget';

import Client from '../../Client';
import Helpers from '../../Helpers';

const defaultConnectionParameters = { name: "", provider: "", host: "", port: 443, api_key: "", ssl: true };

class ConnectionsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeConnection: defaultConnectionParameters,
      connections: [],
      toasters: [],
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

  componentDidMount() {
    Client.getConnections()
      .then(response => response.data.data)
      .then(connections => this.setState({ connections: connections }))
  }

  addToast(title, message) {
    this.setState({ toasters: [...this.state.toasters, { title: title, message: message }] });
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
    const toasterTitle = "Connection Create - " + this.state.activeConnection.name;
    Client.createConnection(this.state.activeConnection)
      .then(response => {
        this.setState({activeConnection: defaultConnectionParameters, isConnectionModalOpen: false})
        this.componentDidMount();
        this.addToast(toasterTitle, "Connection successfully created");
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  handleTestConnectionClick() {
    const toasterTitle = "Connection Test - " + this.state.activeConnection.name;
    Client.testConnection(this.state.activeConnection)
      .then(response => {
        this.addToast(toasterTitle, response.data.message);
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  handleUpdateConnectionClick() {
    const toasterTitle = "Connection Update - " + this.state.activeConnection.name;
    Client.updateConnection(this.state.activeConnection)
      .then(response => {
        this.setState({activeConnection: defaultConnectionParameters, isConnectionModalOpen: false})
        this.componentDidMount();
        this.addToast(toasterTitle, "Connection successfully updated");
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  handleDeleteConnectionClick() {
    const toasterTitle = "Connection Delete - " + this.state.activeConnection.name;
    Client.deleteConnection(this.state.activeConnection)
      .then(response => {
        this.setState({activeConnection: defaultConnectionParameters, isConnectionModalOpen: false})
        this.componentDidMount();
        this.addToast(toasterTitle, response.data.message);
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  connections() {
    return this.state.connections.map((connection) => {
      return(
        <CCol key={connection.id} xs="12" sm="6" lg="3">
          <Widget
            text={connection.name}
            icon={Helpers.connectionLogo(connection.provider)}
            onClick={() => {this.handleConnectionClick(connection)}}
          />
        </CCol>
      )
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
    return(
      <>
        <Header />
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid>
              <CRow>
                {this.connections()}

                <CCol xs="12" sm="6" lg="3">
                  <Widget
                    text="New"
                    icon={<i className="fas fa-plus card-icon"/>}
                    onClick={() => {this.handleNewConnectionClick()}}
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

            {this.toasters()}
          </main>
        </div>
      </>
    )
  }
}

export default ConnectionsContainer;
