import axios from 'axios';
import socketIOClient from "socket.io-client";
const baseUrl = `${process.env.REACT_APP_BACKEND_URI}/api/projects`;
let socket = null;

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

export const connect = async (name, addComment, updateComment) => {
  socket = await socketIOClient(baseUrl, { query: `name=${name}` });
  socket.on('add comment', (data) => addComment(data));
  socket.on('update comment', (data) => updateComment(data));
}

export const disconnect = (name) => {
  socket.disconnect();
}

export const emitAdd = async (data) => {
  socket.emit('add', data);
}

export const emitUpdate = async (data) => {
  socket.emit('update', data);
}

export default { create, getProject, login, connect, disconnect, emitAdd, emitUpdate };
