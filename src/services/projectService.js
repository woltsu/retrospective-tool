import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_BACKEND_URI}/api/projects`;

export const create = async (newProject) => {
  try {
    let error = null;
    const response = await axios.post(baseUrl, newProject)
      .catch((e) => { error = e.response.data; });
    return error ? error : response;
  } catch (e) {
    return { error: 'Connection error' };
  }
};

export const getProject = async ({ name, token }) => {
  try {
    let error = null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(`${baseUrl}/${name}`, config)
      .catch((e) => { error = e.response.data; });
    return error ? error : response.data;
  } catch (e) {
    return { error: 'Connection error' };
  }
};

export const login = async (credentials) => {
  try {
    let error = null;
    const response = await axios.post(`${baseUrl}/login`, credentials)
      .catch((e) => { error = e.response.data; });
    return error ? error : response;
  } catch (e) {
    return { error: 'Connection error' };
  }
};
