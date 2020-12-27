import axios from 'axios';

function createConnection(connection) {
  return axios.post('/api/v1/settings/connections', {
    name: connection.name,
    provider: connection.provider,
    host: connection.host,
    port: connection.port,
    api_key: connection.api_key,
    ssl: connection.ssl
  });
}

function deleteConnection(connection) {
  const URL = `/api/v1/settings/connections/${connection.id}`;

  return axios.delete(URL);
}

function getConnections() {
  const URL = '/api/v1/settings/connections';

  return axios.get(URL);
}

function getConnection(connection) {
  const URL = `/api/v1/settings/connections/${connection.id}`;

  return axios.get(URL);
}

function updateConnection(connection) {
  const URL = `/api/v1/settings/connections/${connection.id}`;

  return axios.patch(URL, {
    name: connection.name,
    provider: connection.provider,
    host: connection.host,
    port: connection.port,
    api_key: connection.api_key,
    ssl: connection.ssl ? 1 : 0
  });
}

const Client = {
  createConnection,
  deleteConnection,
  getConnections,
  getConnection,
  updateConnection
};

export default Client;
