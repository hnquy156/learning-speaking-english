import Spinner from '@/components/Spinner';
import MicrophoneIcon from '@/components/icons/MicrophoneIcon';
import StopIcon from '@/components/icons/StopIcon';
import VolumnIcon from '@/components/icons/VolumnIcon';
import { createChat, updateChat } from '@/utils/api';
import { CHAT_ROLES } from '@/utils/constant';
import { useEffect, useRef, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const ChatBoxContainer = ({
  messages,
  selectedChat,
  setSelectedChat,
  fetchAllChats,
}) => {
  const {
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    transcript,
  } = useSpeechRecognition();
  const recordingTimeout = useRef(null);
  const speechSynthesisRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
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
    if (interimTranscript && listening) {
      extendRecording();
    }
  }, [interimTranscript]);

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
    setContent(`${content} ${transcript}`.trim());
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const handleKeyDown = async (event) => {
    try {
      if (event.key === 'Enter') {
        if (!event.shiftKey) {
          event.preventDefault();
          const message = event.target.value.trim();
          console.log(
            `Submit chat to server: ID - ${selectedChat?._id} - Content: ${message}`
          );
          if (!message) return;
          setLoading(true);
          const newChat = selectedChat?._id
            ? await updateChat(selectedChat._id, message)
            : await createChat(message);

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
    let synth = speechSynthesisRef.current;
    if (synth) {
      synth.cancel();
    } else {
      synth = window.speechSynthesis;
      speechSynthesisRef.current = synth;
    }
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[index % 2];
    synth.speak(utterance);
  };

  return (
    <>
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
      {browserSupportsSpeechRecognition && (
        <button
          className="self-center hover:bg-slate-100 opacity-70 rounded-full p-2"
          onClick={handleRecord}
        >
          {listening ? <StopIcon /> : <MicrophoneIcon />}
        </button>
      )}
      <div className="min-h-20 max-h-60 w-4/6 self-center relative">
        <textarea
          id="text"
          className="border-solid border-2 focus:outline-none focus:border-sky-500 rounded-xl w-full h-full p-4"
          rows={3}
          onKeyDown={handleKeyDown}
          disabled={loading || listening}
          value={content + (transcript ? ` ${transcript}` : '')}
          onChange={(e) => setContent(e.target.value)}
          onFocus={resetTranscript}
        />
        {loading && (
          <div className="self-center absolute right-1/2 bottom-1/2 translate-y-1/2 translate-x-1/2">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBoxContainer;
