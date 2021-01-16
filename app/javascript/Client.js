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
    config: profile.config,
    transcoder_config: profile.transcoder_config
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

function transcodeMovie(movie) {
  const URL = `/api/v1/movies/${movie.id}/transcode`;

  return axios.patch(URL);
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

function updateMovie(movie) {
  const URL = `/api/v1/movies/${movie.id}`;

  return axios.patch(URL, {
    profile_id: movie.profile_id
  });
}

function updateProfile(profile) {
  const URL = `/api/v1/settings/profiles/${profile.id}`;

  return axios.patch(URL, {
    name: profile.name,
    config: profile.config,
    transcoder_config: profile.transcoder_config
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
  transcodeMovie,
  updateConnection,
  updateMovie,
  updateProfile
};

export default Client;
