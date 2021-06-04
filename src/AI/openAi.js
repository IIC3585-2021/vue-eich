import apiKey from '../variables/apiKey';
const OpenAI = require('openai-api');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY = apiKey;

const openai = new OpenAI(OPENAI_API_KEY);

export default openai;