import { API_PREFIX } from '../utils/constant';

export const getChats = async () => {
  const res = await fetch(`${API_PREFIX}/chats`);
  return res.json();
};

export const getChat = async (id) => {
  const res = await fetch(`${API_PREFIX}/chats/` + id);
  return res.json();
};

