import React from 'react';
import { CWidgetIcon } from "@coreui/react";

function ConnectionWidget({
  text,
  icon,
  onConnectionClick
}) {
  const style = { cursor: "pointer" };

  return(
    <CWidgetIcon
      text={text}
      color="secondary"
      iconPadding={false}
      onClick={onConnectionClick}
      style={style}
    >
      {icon}
    </CWidgetIcon>
  );
}

export default ConnectionWidget;
