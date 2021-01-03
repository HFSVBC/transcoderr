import React from 'react';
import { CWidgetIcon } from "@coreui/react";

function Widget({
  text,
  icon,
  onClick
}) {
  const style = { cursor: "pointer" };

  return(
    <CWidgetIcon
      text={text}
      color="secondary"
      iconPadding={false}
      onClick={onClick}
      style={style}
    >
      {icon}
    </CWidgetIcon>
  );
}

export default Widget;
