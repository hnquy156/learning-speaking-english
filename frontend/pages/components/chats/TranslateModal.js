import Link from 'next/link';
import Modal from '../Modal';
import VolumnIcon from '@/components/icons/VolumnIcon';
import { useRef, useState } from 'react';
import { createWord, getSpeakingFromGoogle } from '@/utils/api';

const TranslateModal = ({
  isOpen,
  onClose,
  corrected = '',
  translated = '',
  original = '',
}) => {
  const audioRef = useRef(null);
  const [message, setMessage] = useState({ color: 'green', message: '' });

  const handleSpeaking = async () => {
    try {
      if (audioRef.current) {
        if (!audioRef.current.src) {
          const res = await getSpeakingFromGoogle(original);
          audioRef.current.src = `data:audio/mp3;base64,${res.data}`;
        }
        audioRef.current.play();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setMessage({ color: 'text-green-600', message: '' });
    onClose();
  };

  const handleSaveWord = async () => {
    try {
      await createWord({ original, translated });
      setMessage({
        message: 'Save word successfully',
        color: 'text-green-600',
      });
    } catch (error) {
      console.error(error);
      setMessage({ message: error.message, color: 'text-rose-600' });
    }
  };

  const createURL = (text) =>
    `https://translate.google.com/?hl=vi&sl=en&tl=vi&op=translate&text=${text}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onOk={handleSaveWord}
      title="Translate Word"
    >
      <div className="text-xl mb-2 font-medium capitalize">
        Word: {original}
      </div>
      {Boolean(corrected) && (
        <div className="capitalize">Corrected: {corrected}</div>
      )}
      <div className="capitalize">Nghĩa: {translated}</div>
      <button
        className="p-3 bg-slate-200 hover:bg-slate-300 cursor-pointer opacity-70 rounded-full my-2"
        onClick={handleSpeaking}
      >
        <VolumnIcon />
      </button>
      <audio ref={audioRef} hidden />
      <div className="my-4 text-blue-600 font-medium text-xl">
        <Link href={createURL(original)} target="_blank">
          See detailed translation on Google Translate
        </Link>
      </div>
      {message.message && (
        <div className={`${message.color} font-medium text-xl`}>
          {message.message}
        </div>
      )}
    </Modal>
  );
};

export default TranslateModal;
