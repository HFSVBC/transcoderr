import React from 'react';
import Select from 'react-select';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CCol,
  CLabel,
  CModalTitle,
  CButton,
} from "@coreui/react";

function MovieModal({
  movie,
  profiles,
  handleActiveMovieChange,
  isNew,
  isOpen,
  onSubmitClick,
  toggle
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitClick();
  };

  return (
    <div>
      <CModal centered size="lg" show={isOpen} onClose={toggle}>
        <CModalHeader>
          <CModalTitle>{isNew ? "New Movie" : movie.name}</CModalTitle>
        </CModalHeader>

        <CForm className="form-horizontal" onSubmit={handleSubmit}>
          <CModalBody>
            <CFormGroup row>
              <CCol md="4" className="text-right">
                <CLabel htmlFor="movieHost">Profile</CLabel>
              </CCol>
              <CCol xs="12" md="8">
                <Select
                  name="profile"
                  id="movieProfile"
                  value={profiles.find(profile => profile.value === movie.profile_id)}
                  onChange={e => handleActiveMovieChange('profile_id', e.value)}
                  options={profiles}
                  isSearchable={true}
                  required
                />
              </CCol>
            </CFormGroup>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={toggle}>Cancel</CButton>
            <CButton color="primary" type="submit">Save</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </div>
  );
}

export default MovieModal;
