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

    const text = document.getElementById('text');
    const resize = () => {
      text.style.height = 'auto';
      text.style.height = text.scrollHeight + 'px';
    };
    text.addEventListener('input', resize);

    return () => text.removeEventListener('input', resize);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Action for Shift+Enter
        console.log('Shift+Enter key pressed');
      } else {
        // Action for Enter
        console.log('Enter key pressed');
        event.preventDefault(); 
      }
    }
  };

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-3 bg-slate-50 h-full">
        <ul>
          {chats.map((chat) => (
            <li key={chat._id}>{chat.messages[0].content}</li>
          ))}
        </ul>
      </div>
      <div className="col-span-9 bg-white flex flex-col justify-between p-4">
        <div className="font-bold text-2xl">Chat Content</div>
        <textarea
          id="text"
          className="border-solid border-2 focus:outline-none focus:border-sky-500 rounded-xl min-h-20 max-h-60 w-4/6 self-center p-4"
          rows={3}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
