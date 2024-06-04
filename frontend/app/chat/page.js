'use client';
import { useEffect, useState } from 'react';
import { getChat, getChats, updateChat } from './api';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setMessages(selectedChat?.messages || []);
  }, [selectedChat]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        console.log(
          `Submit chat to server: ID - ${selectedChat?._id} - Content: ${event.target.value}`
        );
        setLoading(true);
        if (selectedChat?._id) {
          // timeoutRef.current = setTimeout(() => loading(false), 3000);
          const newChat = await updateChat(
            selectedChat._id,
            event.target.value
          );
          setSelectedChat(newChat);
          event.target.value = '';
        } else {
          console.log('Create new chat');
        }
        setLoading(false);
      }
    }
  };

  const handleViewChat = async (id) => {
    const res = await getChat(id);
    setSelectedChat(res.data);
  };

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-3 bg-slate-50 h-full flex flex-col">
        <button
          className="self-center border-gray-300 border-2 rounded-lg p-1 m-2 w-5/6 hover:bg-slate-100"
          onClick={() => setSelectedChat(null)}
        >
          + Add new chat
        </button>
        <ul>
          {chats.map((chat) => (
            <li key={chat._id} onClick={() => handleViewChat(chat._id)}>
              {chat.messages[1].content}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-9 bg-white flex flex-col justify-between p-4">
        <div className="font-bold text-2xl">Chat Content</div>
        <div className="flex flex-col justify-start grow mb-8">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-4 border-gray-300 rounded-xl border-2 mt-4 w-5/6 self-${
                msg.role === 'user' ? 'start' : 'end'
              }`}
              hidden={msg.role === 'system'}
            >
              <span className="capitalize">{msg.role}</span>: {msg.content}
            </div>
          ))}
        </div>
        <textarea
          id="text"
          className="border-solid border-2 focus:outline-none focus:border-sky-500 rounded-xl min-h-20 max-h-60 w-4/6 self-center p-4"
          rows={3}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
      </div>
    </div>
  );
}
