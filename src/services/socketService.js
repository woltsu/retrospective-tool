import socketIOClient from "socket.io-client";
const baseUrl = `${process.env.REACT_APP_BACKEND_URI}/api/projects`;
let socket = null;
let id = null;

export const connect = async (
  name,
  username,
  addComment,
  updateComment,
  removeComment,
  addNewSocketUser,
  removeSocketUser
) => {
  socket = await socketIOClient(baseUrl, { query: {
    name,
    username
  }});
  socket.on('add comment', (data) => addComment(data));
  socket.on('update comment', (data) => updateComment(data));
  socket.on('remove comment', (data) => removeComment(data));
  socket.on('set id', (data) => id = data);
  socket.on('joined', (data) => {
    addNewSocketUser(data);
    socket.emit('introduce', { id, username });
  });
  socket.on('introduce', (data) => addNewSocketUser(data));
  socket.on('disconnected', (data) => removeSocketUser(data));
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
  getSocket,
  getId
};
