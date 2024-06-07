import { useEffect, useState } from 'react';
import Head from 'next/head';
import { deleteWord, getWords } from '@/utils/api';
import moment from 'moment';
import EditModal from '../components/words/EditModal';

const Word = () => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const res = await getWords();
      setWords(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = window.confirm('Are you sure you want to delete this word?');
      if (res) {
        await deleteWord(id);
        await fetchWords();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditWord = (word) => {
    setSelectedWord({ ...word });
    setIsModalOpen(true);
  };

  return (
    <div className="chat-container p-8 bg-zinc-200">
      <Head>
        <title>Words</title>
        <meta property="og:title" content="Words" key="title" />
      </Head>
      <div className="font-bold text-2xl mb-8">Word List</div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Word
              </th>
              <th scope="col" className="px-3 py-3">
                Meaning
              </th>
              <th scope="col" className="px-3 py-3">
                Created at
              </th>
              <th scope="col" className="px-3 py-3">
                Bookmark
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr
                key={word._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                >
                  {word.original}
                </th>
                <td className="px-3 py-4 capitalize">{word.translated}</td>
                <td className="px-3 py-4">
                  {moment(word.created_at).format('YYYY-MM-DD HH:mm:ss')}
                </td>
                <td className="px-3 py-4">{word.bookmarked}</td>
                <td className="px-3 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEditWord(word)}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-rose-600 dark:text-blue-500 hover:underline ml-4"
                    onClick={() => handleDelete(word._id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <EditModal
          onClose={() => setIsModalOpen(false)}
          isOpen={true}
          {...selectedWord}
          fetchWords={fetchWords}
        />
      )}
    </div>
  );
};

export default Word;
