import React, { Component } from 'react';
import {
  CCol,
  CContainer,
  CRow
} from "@coreui/react";

import ProfileModal from "../components/ProfileModal";
import Toaster from "../components/Toaster";
import Widget from "../components/Widget";

import Client from '../../Client';

const defaultProfileParameters = { name: "", config: {}, transcoder_config: {} };

class ProfilesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProfile: defaultProfileParameters,
      isNewProfile: false,
      isProfileModalOpen: false,
      profiles: [],
      toasters: []
    }

    this.handleProfileModalToggle = this.handleProfileModalToggle.bind(this);
    this.handleNewProfileClick = this.handleNewProfileClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleActiveProfileChange = this.handleActiveProfileChange.bind(this);
    this.handleCreateProfileClick = this.handleCreateProfileClick.bind(this);
    this.handleUpdateProfileClick = this.handleUpdateProfileClick.bind(this);
    this.handleDeleteProfileClick = this.handleDeleteProfileClick.bind(this);
  }

  componentDidMount() {
    Client.getProfiles()
      .then(response => response.data.data)
      .then(profiles => this.setState({ profiles: profiles }))
  }

  addToast(title, message) {
    this.setState(prevState => (
      { toasters: [...prevState.toasters, { title: title, message: message }] }
    ));
  }

  handleProfileModalToggle() {
    this.setState({
      isProfileModalOpen: !this.state.isProfileModalOpen,
    });
  }

  handleNewProfileClick() {
    this.setState({
      activeProfile: defaultProfileParameters,
      isProfileModalOpen: true,
      isNewProfile: true
    });
  }

  handleProfileClick(profile) {
    Client.getProfile(profile)
      .then(response => response.data.data)
      .then(profile => this.setState({
        activeProfile: profile,
        isProfileModalOpen: true,
        isNewProfile: false
      }));
  }

  handleActiveProfileChange(profileProperty, newValue) {
    this.setState(prevState => (
      { activeProfile: { ...prevState.activeProfile, [profileProperty]: newValue } }
    ));
  }

  handleCreateProfileClick() {
    const toasterTitle = "Profile Create - " + this.state.activeProfile.name;
    Client.createProfile(this.state.activeProfile)
      .then(response => {
        this.setState({activeProfile: defaultProfileParameters, isProfileModalOpen: false})
        this.componentDidMount();
        this.addToast(toasterTitle, "Profile successfully created");
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  handleUpdateProfileClick() {
    const toasterTitle = "Profile Update - " + this.state.activeProfile.name;
    Client.updateProfile(this.state.activeProfile)
      .then(response => {
        this.setState({activeProfile: defaultProfileParameters, isProfileModalOpen: false})
        this.componentDidMount();
        this.addToast(toasterTitle, "Profile successfully updated");
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  handleDeleteProfileClick() {
    const toasterTitle = "Profile Delete - " + this.state.activeProfile.name;
    Client.deleteProfile(this.state.activeProfile)
      .then(response => {
        this.setState({activeProfile: defaultProfileParameters, isProfileModalOpen: false})
        this.componentDidMount();
        this.addToast(toasterTitle, response.data.message);
      })
      .catch(error => {
        this.addToast(toasterTitle, error.response.data.message || error.response.statusText);
      });
  }

  profiles() {
    return this.state.profiles.map((profile) => {
      return(
        <CCol key={profile.id} xs="12" sm="6" lg="3">
          <Widget
            text={profile.name}
            icon={<i className="fas fa-screwdriver card-icon"/>}
            onClick={() => {this.handleProfileClick(profile)}}
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
      <main className="c-main">
        <CContainer fluid>
          <CRow>
            {this.profiles()}

            <CCol xs="12" sm="6" lg="3">
              <Widget
                text="New"
                icon={<i className="fas fa-plus card-icon"/>}
                onClick={() => {this.handleNewProfileClick()}}
              />
            </CCol>
          </CRow>
        </CContainer>

        <ProfileModal
          isNew={this.state.isNewProfile}
          isOpen={this.state.isProfileModalOpen}
          profile={this.state.activeProfile}
          toggle={this.handleProfileModalToggle}
          handleActiveProfileChange={this.handleActiveProfileChange}
          onSubmitClick={this.state.isNewProfile ? this.handleCreateProfileClick : this.handleUpdateProfileClick}
          onDeleteClick={this.handleDeleteProfileClick}
        />

        {this.toasters()}
      </main>
    )
  }
}

export default ProfilesContainer;
