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
