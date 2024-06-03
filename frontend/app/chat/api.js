// 'use client';
import { cache } from 'react';

export const getChats = cache(async () => {
  let res = await fetch('http://localhost:5000/api/v1/chats');
  return res.json();
});
