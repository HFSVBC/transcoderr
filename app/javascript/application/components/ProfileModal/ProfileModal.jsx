import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CInput,
  CCol,
  CLabel,
  CModalTitle,
  CInputCheckbox,
  CButton,
} from "@coreui/react";

import JsonEditor from "../JsonEditor";

function ProfileModal({
  profile,
  isNew,
  isOpen,
  toggle,
  handleActiveProfileChange,
  onDeleteClick,
  onSubmitClick
}) {
  let defaultProfile = profile.default;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitClick();
  };

  const toggleDefaultProfile = () => {
    defaultProfile = !defaultProfile;
    handleActiveProfileChange('default', defaultProfile);
  };

  return (
    <div>
      <CModal centered size="lg" show={isOpen} onClose={toggle}>
        <CModalHeader>
          <CModalTitle>{isNew ? "New Profile" : profile.name}</CModalTitle>
        </CModalHeader>

        <CForm className="form-horizontal" onSubmit={handleSubmit}>
          <CModalBody>
            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="profileName">Name</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  type="text"
                  name="name"
                  id="profileName"
                  value={profile.name}
                  onChange={e => handleActiveProfileChange('name', e.target.value)}
                  required
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="profileName">Default</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    name="default"
                    id="profileName"
                    checked={defaultProfile}
                    onChange={toggleDefaultProfile}
                  />
                </CFormGroup>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="profileConfig">Config</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <JsonEditor
                  value={profile.config}
                  onChange={e => handleActiveProfileChange('config', e)}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="profileConfig">Transcoder Config</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <JsonEditor
                  value={profile.transcoder_config}
                  onChange={e => handleActiveProfileChange('transcoder_config', e)}
                />
              </CCol>
            </CFormGroup>
          </CModalBody>

          <CModalFooter>
            {
              !isNew &&
              <CButton color="danger" className="mr-auto" onClick={onDeleteClick}>Delete</CButton>
            }
            <CButton color="secondary" onClick={toggle}>Cancel</CButton>
            <CButton color="primary" type="submit">Save</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </div>
  );
}

export default ProfileModal;
