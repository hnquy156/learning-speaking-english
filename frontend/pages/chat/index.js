import { useEffect, useState } from 'react';
import { deleteChat, getChat, getChats } from '@/utils/api';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import ChatSideBar from '../components/chats/ChatSideBar';
import ChatBoxContainer from '../components/chats/ChatBoxContainer';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchAllChats();
  }, []);

  useEffect(() => {
    setMessages(selectedChat?.messages || []);
    const chatbox = document.getElementById('chatbox');
    const timeout = setTimeout(() => {
      chatbox?.scrollTo({ top: chatbox?.scrollHeight, behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timeout);
  }, [selectedChat]);

  const fetchAllChats = async () => {
    try {
      const res = await getChats();
      setChats(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteChat = async (id) => {
    try {
      const res = window.confirm('Are you sure to delete this chat?');
      if (res) {
        await deleteChat(id);
        await fetchAllChats();
        if (id === selectedChat?._id) setSelectedChat(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewChat = async (id) => {
    try {
      const res = await getChat(id);
      setSelectedChat(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetChat = () => {
    setSelectedChat(null);
  };

  return (
    <div className="chat-container">
      <Head>
        <title>Chat</title>
        <meta property="og:title" content="Chat" key="title" />
      </Head>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-3 bg-slate-50 h-full flex flex-col">
          <ChatSideBar
            chats={chats}
            handleResetChat={handleResetChat}
            handleViewChat={handleViewChat}
            handleDeleteChat={handleDeleteChat}
          />
        </div>
        <div className="col-span-9 bg-white h-full flex flex-col justify-between p-4">
          <ChatBoxContainer
            messages={messages}
            fetchAllChats={fetchAllChats}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </div>
      </div>
    </div>
  );
};

const NoSSR = dynamic(() => Promise.resolve(Chat), { ssr: false });

export default () => <NoSSR />;
