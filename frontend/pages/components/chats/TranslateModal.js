import Link from 'next/link';
import Modal from '../Modal';
import VolumnIcon from '@/components/icons/VolumnIcon';

const TranslateModal = ({
  isOpen,
  onClose,
  corrected = '',
  translated = '',
  original = '',
}) => {
  const createURL = (text) =>
    `https://translate.google.com/?hl=vi&sl=en&tl=vi&op=translate&text=${text}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Translate Word">
      <div className="text-xl mb-2 font-medium capitalize">
        Word: {original}
      </div>
      {Boolean(corrected) && (
        <div className="capitalize">Corrected: {corrected}</div>
      )}
      <div className="capitalize">Nghĩa: {translated}</div>
      <button
        className="p-3 bg-slate-200 hover:bg-slate-300 cursor-pointer opacity-70 rounded-full my-2"
        // onClick={() => handleSpeaking(msg.content, index)}
      >
        <VolumnIcon />
      </button>
      <div className="mt-4 text-blue-600 font-medium text-xl">
        <Link href={createURL(original)} target="_blank">
          See detailed translation on Google Translate
        </Link>
      </div>
    </Modal>
  );
};

export default TranslateModal;
