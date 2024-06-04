import { API_PREFIX } from '../utils/constant';
import { putData } from '../utils/utils';

export const getChats = async () => {
  const res = await fetch(`${API_PREFIX}/chats`);
  return res.json();
};

export const getChat = async (id) => {
  const res = await fetch(`${API_PREFIX}/chats/` + id);
  return res.json();
};

export const updateChat = async (id, message) => {
  const res = await putData(`${API_PREFIX}/chats/${id}`, { message });
  return res.data;
};
