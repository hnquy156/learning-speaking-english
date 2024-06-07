import Modal from '../Modal';
import { useState } from 'react';
import { updateWord } from '@/utils/api';

const EditModal = ({
  isOpen,
  onClose,
  _id,
  translated,
  original,
  fetchWords,
}) => {
  const [message, setMessage] = useState('');
  const [word, setWord] = useState({ translated, original });

  const handleSaveWord = async () => {
    try {
      await updateWord(_id, word);
      await fetchWords();
      onClose();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleChangeWord = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSaveWord}
      title="Edit Word"
    >
      <div>
        <span className="inline-block w-20 mr-4">Word: </span>
        <input
          className="capitalize border-2 p-2 rounded"
          onChange={handleChangeWord}
          name="original"
          value={word.original}
        />
      </div>
      <div className="mt-2">
        <span className="inline-block w-20 mr-4">Meaning: </span>
        <input
          className="capitalize border-2 p-2 rounded"
          onChange={handleChangeWord}
          name="translated"
          value={word.translated}
        />
      </div>
      {message && (
        <div className="text-rose-600 font-medium text-xl my-4">{message}</div>
      )}
    </Modal>
  );
};

export default EditModal;
