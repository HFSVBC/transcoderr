import React from 'react';

import radarrLogo from './images/logos/Radarr.svg';
import sonarrLogo from './images/logos/Sonarr.svg';

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

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

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

const Helpers = {
  bytesToSize,
  connectionLogo,
  humanize,
  truncateString
};

export default Helpers;
