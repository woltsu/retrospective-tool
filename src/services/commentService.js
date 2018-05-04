import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_BACKEND_URI}/api/comments`;

const create = async (comment, token) => {
  try {
    let error = null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post(baseUrl, comment, config)
      .catch((e) => { error = e.response.data; });
    return error ? error : response.data;
  } catch (e) {
    return { error: 'Connection error' };
  }
};

const put = async (_id, newValues, token) => {
  try {
    let error = null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.put(`${baseUrl}/${_id}`, newValues, config)
      .catch((e) => { error = e.response.data; });
    return error ? error : response.data;
  } catch (e) {
    return { error: 'Connection error' };
  }
};

export default { create, put };
