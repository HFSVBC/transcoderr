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
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitClick();
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
                <CLabel htmlFor="profileConfig">Config</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <JsonEditor
                  value={profile.config}
                  onChange={e => handleActiveProfileChange('config', e)}
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