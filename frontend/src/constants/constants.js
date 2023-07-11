const { REACT_APP_BASE_URL } = process.env;

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : REACT_APP_BASE_URL;
