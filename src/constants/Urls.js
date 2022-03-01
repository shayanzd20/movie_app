const config = require('../../package.json');

const OMDBAPI_BASE_URL = 'http://www.omdbapi.com';

const OMDB_API_KEY = config.projectConfig.omdbApiKey;

export { OMDBAPI_BASE_URL, OMDB_API_KEY };
