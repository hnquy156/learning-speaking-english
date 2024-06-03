'use client';
import { useEffect, useState } from 'react';
import { getChats } from './api';

export default function Chat() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getChats();
      setChats(res.data);
    })();
  }, []);

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-3 bg-slate-50 h-full">
        <ul>
          {chats.map((chat) => (
            <li key={chat._id}>{chat.messages[0].content}</li>
          ))}
        </ul>
      </div>
      <div className="col-span-9 bg-white font-bold text-2xl">Chat Content</div>
    </div>
  );
}
