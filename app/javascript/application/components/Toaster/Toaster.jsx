import React from 'react';
import { CToaster, CToast, CToastHeader, CToastBody } from "@coreui/react";

function Toaster({
  title,
  message,
  position,
  autoHide,
  fade
}) {
  return(
    <CToaster
      position={position || 'top-right'}
    >
      <CToast
        show={true}
        autohide={autoHide || 5000}
        fade={fade || true}
      >
        <CToastHeader closeButton={true}>
          { title }
        </CToastHeader>
        <CToastBody>
          { message }
        </CToastBody>
      </CToast>
    </CToaster>
  );
}

export default Toaster;
