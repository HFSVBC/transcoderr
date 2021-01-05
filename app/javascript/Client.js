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

function createProfile(profile) {
  return axios.post('/api/v1/settings/profiles', {
    name: profile.name,
    config: profile.config
  });
}

function deleteConnection(connection) {
  const URL = `/api/v1/settings/connections/${connection.id}`;

  return axios.delete(URL);
}

function deleteProfile(profile) {
  const URL = `/api/v1/settings/profiles/${profile.id}`;

  return axios.delete(URL);
}

function getConnections() {
  const URL = '/api/v1/settings/connections';

  return axios.get(URL);
}

function getMovies(page=1) {
  const URL = '/api/v1/movies'

  return axios.get(URL, {params: {page: page}})
}

function getMovie(movie_id) {
  const URL = `/api/v1/movies/${movie_id}`

  return axios.get(URL);
}

function getProfiles() {
  const URL = '/api/v1/settings/profiles';

  return axios.get(URL);
}

function getConnection(connection) {
  const URL = `/api/v1/settings/connections/${connection.id}`;

  return axios.get(URL);
}

function getProfile(profile) {
  const URL = `/api/v1/settings/profiles/${profile.id}`;

  return axios.get(URL);
}

function testConnection(connection) {
  return axios.post('/api/v1/settings/connections/test', {
    id: connection.id,
    name: connection.name,
    provider: connection.provider,
    host: connection.host,
    port: connection.port,
    api_key: connection.api_key,
    ssl: connection.ssl
  });
}

function updateConnection(connection) {
  const URL = `/api/v1/settings/connections/${connection.id}`;

  return axios.patch(URL, {
    name: connection.name,
    host: connection.host,
    port: connection.port,
    ssl: connection.ssl
  });
}

function updateProfile(profile) {
  const URL = `/api/v1/settings/profiles/${profile.id}`;

  return axios.patch(URL, {
    name: profile.name,
    config: profile.config
  });
}

const Client = {
  createConnection,
  createProfile,
  deleteConnection,
  deleteProfile,
  getConnections,
  getMovies,
  getMovie,
  getProfiles,
  getConnection,
  getProfile,
  testConnection,
  updateConnection,
  updateProfile
};

export default Client;
