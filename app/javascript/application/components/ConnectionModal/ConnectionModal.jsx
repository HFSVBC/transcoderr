import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CCol,
  CLabel,
  CModalTitle,
  CButton,
} from "@coreui/react";

import Helpers from '../../../Helpers';

function ConnectionModal({
  connection,
  handleActiveConnectionChange,
  isOpen,
  onDeleteClick,
  onSubmitClick,
  toggle
}) {
  let ssl = connection.ssl;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitClick();
  };

  const toggleSSL = () => {
    ssl = !ssl;
    handleActiveConnectionChange('ssl', ssl);
  };

  return (
    <div>
      <CModal centered size="lg" show={isOpen} onClose={toggle}>
        <CModalHeader>
          <CModalTitle>{connection.name}</CModalTitle>
        </CModalHeader>

        <CForm className="form-horizontal" onSubmit={handleSubmit}>
          <CModalBody>
            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="connectionName">Name</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  type="text"
                  name="name"
                  id="connectionName"
                  value={connection.name}
                  onChange={e => handleActiveConnectionChange('name', e.target.value)}
                  required
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="connectionHost">Host</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  type="text"
                  name="host"
                  id="connectionHost"
                  value={connection.host}
                  onChange={e => handleActiveConnectionChange('host', e.target.value)}
                  required
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="connectionPort">Port</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CInput
                  type="text"
                  name="port"
                  id="connectionPort"
                  value={connection.port}
                  onChange={e => handleActiveConnectionChange('port', e.target.value)}
                  required
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="connectionSSL">Use SSL</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    name="ssl"
                    id="connectionSSL"
                    defaultChecked={ssl}
                    onChange={toggleSSL}
                  />
                  <CLabel variant="checkbox" className="form-check-label">
                    Connect to {Helpers.humanize(connection.provider)} over HTTPS instead of HTTP
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup>
          </CModalBody>

          <CModalFooter>
            <CButton color="danger" className="mr-auto" onClick={onDeleteClick}>Delete</CButton>
            <CButton color="secondary">Test</CButton>
            <CButton color="secondary" onClick={toggle}>Cancel</CButton>
            <CButton color="primary" type="submit">Save</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </div>
  );
}

export default ConnectionModal;
