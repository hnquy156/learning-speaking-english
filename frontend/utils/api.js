import { API_PREFIX } from './constant';
import { deleteData, postData, putData } from './utils';

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

export const createChat = async (message) => {
  const res = await postData(`${API_PREFIX}/chats`, { message });
  return res.data;
};

export const deleteChat = async (id) => {
  const res = await deleteData(`${API_PREFIX}/chats/${id}`);
  return res.data;
};

export const getTranslatedWordFromGoogle = async (content) => {
  const res = await fetch(`${API_PREFIX}/dictionaries/google?q=${content}`);
  return res.json();
};

export const getSpeakingFromGoogle = async (content) => {
  const res = await fetch(
    `${API_PREFIX}/dictionaries/google/speak?q=${content}`
  );
  return res.json();
};

export const getWords = async () => {
  const res = await fetch(`${API_PREFIX}/words`);
  return res.json();
};

export const createWord = async (word) => {
  const res = await postData(`${API_PREFIX}/words`, word);
  return res.data;
};
