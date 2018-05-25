import socketIOClient from "socket.io-client";
const baseUrl = `${process.env.REACT_APP_BACKEND_URI}/api/projects`;
let socket = null;
let id = null;

let listenersToAdd = [];
let emits = [];
export const connect = async (name, username) => {
  socket = await socketIOClient(baseUrl, { query: {
    name,
    username
  }});
  listenersToAdd.forEach(({ event, func }) => socket.on(event, func));
  emits.forEach(({ event, data }) => socket.emit(event, data));
  socket.on('set id', (newId) => id = newId);
};

export const disconnect = () => {
  socket.disconnect();
};

export const emitAdd = async (data) => {
  socket.emit('add', data);
};

export const emitUpdate = async (data) => {
  socket.emit('update', data);
};

export const emitRemove = async (data) => {
  socket.emit('remove', data);
};

export const emitShowVotes = async (data) => {
  socket.emit('show votes', data);
};

export const addListener = (event, func) => {
  socket ? socket.on(event, func) : listenersToAdd.push({ event, func });
};

export const emit = (event, data) => {
  socket ? socket.emit(event, data) : emits.push({ event, data });
};

const getSocket = () => {
  return socket;
};

export const getId = () => {
  return id;
};

export default {
  connect,
  disconnect,
  emitAdd,
  emitUpdate,
  emitRemove,
  emitShowVotes,
  addListener,
  emit,
  getSocket,
  getId
};
