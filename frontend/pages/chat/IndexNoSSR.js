'use client';
import { useEffect, useRef, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import {
  createChat,
  deleteChat,
  getChat,
  getChats,
  updateChat,
} from '@/utils/api';
import Spinner from '@/components/Spinner';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { CHAT_ROLES } from '@/utils/constant';
import MicrophoneIcon from '@/components/icons/MicrophoneIcon';
import StopIcon from '@/components/icons/StopIcon';
import VolumnIcon from '@/components/icons/VolumnIcon';
import Header from '@/components/Header';

export default function Chat() {
  const {
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
    interimTranscript,
    transcript,
  } = useSpeechRecognition();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [textScript, setTextScript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupportSpeech, setIsSupportSpeech] = useState(
    browserSupportsSpeechRecognition
  );
  const recordingTimeout = useRef(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    fetchAllChats();

    const text = document.getElementById('text');
    const resize = () => {
      text.style.height = 'auto';
      text.style.height = text.scrollHeight + 'px';
    };
    text?.addEventListener('input', resize);

    return () => {
      text?.removeEventListener('input', resize);
      if (recordingTimeout.current) {
        clearTimeout(recordingTimeout.current);
        SpeechRecognition.stopListening();
        resetTranscript();
      }
    };
  }, []);

  useEffect(() => {
    setMessages(selectedChat?.messages || []);
    const chatbox = document.getElementById('chatbox');
    const timeout = setTimeout(() => {
      chatbox?.scrollTo({ top: chatbox?.scrollHeight, behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timeout);
  }, [selectedChat]);

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  useEffect(() => {
    setTextScript(transcript);
  }, [transcript]);

  useEffect(() => {
    if (interimTranscript && listening) {
      extendRecording();
    }
  }, [interimTranscript]);

  useEffect(() => {
    finalTranscriptRef.current = finalTranscript;
  }, [finalTranscript]);

  const extendRecording = () => {
    if (recordingTimeout.current) {
      clearTimeout(recordingTimeout.current);
    }
    recordingTimeout.current = setTimeout(handleStopRecording, 3000);
  };

  const handleStopRecording = () => {
    if (recordingTimeout.current) {
      clearTimeout(recordingTimeout.current);
      recordingTimeout.current = null;
    }
    setContent((c) => `${c} ${finalTranscriptRef.current}`.trim());
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const fetchAllChats = async () => {
    try {
      const res = await getChats();
      setChats(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = async (event) => {
    try {
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
          setContent('');
          setLoading(false);

          if (!selectedChat?._id) fetchAllChats();
        }
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

  const handleRecord = async () => {
    if (listening) {
      handleStopRecording();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      extendRecording();
    }
  };

  const handleSpeaking = (text, index) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[index % 2];
    synth.speak(utterance);
  };

  return (
    <div className="h-screen">
      <Header />
      <div
        className="grid grid-cols-12 chat-container"
        // suppressHydrationWarning={true}
      >
        <div className="col-span-3 bg-slate-50 h-full flex flex-col">
          <button
            className="self-center border-gray-300 border-2 rounded-lg p-1 m-2 w-5/6 hover:bg-slate-100"
            onClick={() => setSelectedChat(null)}
          >
            + Add new chat
          </button>
          <div>
            {chats.map((chat) => (
              <div key={chat._id} className="group m-2 p-1 relative">
                <div
                  className="hover:bg-slate-100 cursor-pointer line-clamp-4"
                  onClick={() => handleViewChat(chat._id)}
                >
                  {chat.messages[1].content}
                </div>
                <div className="hidden group-hover:flex justify-end mr-4 absolute right-1 bottom-1/2 translate-y-1/2">
                  <button
                    className="p-2 bg-slate-200 cursor-pointer opacity-70 rounded-full"
                    onClick={() => handleDeleteChat(chat._id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-9 bg-white h-full flex flex-col justify-between p-4">
          <div className="font-bold text-2xl">Chat Content</div>
          <div
            className="flex flex-col justify-start grow mb-8 overflow-y-auto max-h-screen-80"
            id="chatbox"
          >
            {messages.map((msg, index) => (
              <div
                key={msg._id}
                className={`p-4 border-gray-300 rounded-xl border-2 mt-4 w-5/6 relative group ${
                  msg.role === CHAT_ROLES.USER ? 'self-start' : 'self-end'
                }`}
                hidden={msg.role === CHAT_ROLES.SYSTEM}
              >
                <span className="capitalize">{msg.role}</span>: {msg.content}
                <button
                  className="hidden group-hover:flex absolute right-2 bottom-1/2 translate-y-1/2 p-3 bg-slate-200 cursor-pointer opacity-70 rounded-full"
                  onClick={() => handleSpeaking(msg.content, index)}
                >
                  <VolumnIcon />
                </button>
              </div>
            ))}
          </div>
          {isSupportSpeech && (
            <button
              className="self-center hover:bg-slate-100 opacity-70 rounded-full p-2"
              onClick={handleRecord}
            >
              {isListening ? <StopIcon /> : <MicrophoneIcon />}
            </button>
          )}
          <div className="min-h-20 max-h-60 w-4/6 self-center relative">
            <textarea
              id="text"
              className="border-solid border-2 focus:outline-none focus:border-sky-500 rounded-xl w-full h-full p-4"
              rows={3}
              onKeyDown={handleKeyDown}
              disabled={loading || isListening}
              value={content + (textScript ? ` ${textScript}` : '')}
              onChange={(e) => setContent(e.target.value)}
              onFocus={resetTranscript}
            />
            {loading && (
              <div className="self-center absolute right-1/2 bottom-1/2 translate-y-1/2 translate-x-1/2">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
