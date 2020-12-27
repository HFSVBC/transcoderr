import React from 'react';

import radarrLogo from './images/logos/Radarr.svg';
import sonarrLogo from './images/logos/Sonarr.svg';

function connectionLogo(connectionName) {
  switch (connectionName) {
    case 'radarr':
      return(<img className="card-icon" src={radarrLogo}/>)
    case 'sonarr':
      return(<img className="card-icon" src={sonarrLogo}/>)
    default:
      return(<i className="far fa-window-restore card-icon"/>)
  }
}

function humanize(str) {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
}

const Helpers = {
  connectionLogo,
  humanize
};

export default Helpers;
