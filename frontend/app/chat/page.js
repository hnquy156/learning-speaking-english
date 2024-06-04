'use client';
import { useEffect, useState } from 'react';
import { createChat, deleteChat, getChat, getChats, updateChat } from './api';
import Spinner from '../components/Spinner';
import DeleteIcon from '../components/icons/DeleteIcon';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllChats();

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
    const chatbox = document.getElementById('chatbox');
    const timeout = setTimeout(() => {
      chatbox.scrollTo({ top: chatbox.scrollHeight, behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timeout);
  }, [selectedChat]);

  const fetchAllChats = async () => {
    const res = await getChats();
    setChats(res.data);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        console.log(
          `Submit chat to server: ID - ${selectedChat?._id} - Content: ${event.target.value}`
        );
        setLoading(true);
        const newChat = selectedChat?._id
          ? await updateChat(selectedChat._id, event.target.value)
          : await createChat(event.target.value);

        setSelectedChat(newChat);
        event.target.value = '';
        setLoading(false);

        if (!selectedChat?._id) fetchAllChats();
      }
    }
  };

  const handleViewChat = async (id) => {
    const res = await getChat(id);
    setSelectedChat(res.data);
  };

  const handleDeleteChat = async (id) => {
    const res = window.confirm('Are you sure to delete this chat?');
    if (res) {
      await deleteChat(id);
      await fetchAllChats();
      if (id === selectedChat?._id) setSelectedChat(null);
    }
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
            <div key={chat._id} className="group m-2 p-1">
              <li
                className="hover:bg-slate-100 cursor-pointer line-clamp-2 hover:line-clamp-4"
                onClick={() => handleViewChat(chat._id)}
              >
                {chat.messages[1].content}
              </li>
              <div className="hidden group-hover:flex justify-end mr-4">
                <button onClick={() => handleDeleteChat(chat._id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="col-span-9 bg-white flex flex-col justify-between p-4">
        <div className="font-bold text-2xl">Chat Content</div>
        <div
          className="flex flex-col justify-start grow mb-8 overflow-y-auto max-h-screen-80"
          id="chatbox"
        >
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
        {loading && (
          <div className="self-center m-2">
            <Spinner />
          </div>
        )}
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
