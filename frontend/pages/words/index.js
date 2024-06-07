import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import {
  deleteWord,
  getSpeakingFromGoogle,
  getWords,
  updateWord,
} from '@/utils/api';
import moment from 'moment';
import EditModal from '../components/words/EditModal';
import VolumnIcon from '@/components/icons/VolumnIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import EditIcon from '@/components/icons/EditIcon';
import BookmarkIcon from '@/components/icons/BookmarkIcon';

const Word = () => {
  const [words, setWords] = useState([]);
  const [searchedWords, setSearchedWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [bookmarked, setBookmarked] = useState('');
  const audioRef = useRef(null);

  const handleSpeaking = async (original) => {
    try {
      if (audioRef.current) {
        const res = await getSpeakingFromGoogle(original);
        audioRef.current.src = `data:audio/mp3;base64,${res.data}`;
        audioRef.current.play();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeBookmark = async (word) => {
    try {
      await updateWord(word._id, { ...word, bookmarked: !word.bookmarked });
      await fetchWords();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    const filterBySearch = (text, key) =>
      text.toLowerCase().includes(key.toLowerCase().trim());
    const filterCondition = (w) => {
      return (
        filterBySearch(w.original, search) ||
        filterBySearch(w.translated, search)
      );
    };

    let filterdWs = words;

    if (search.trim()) {
      filterdWs = words.filter(filterCondition);
    }
    if (bookmarked) {
      const b = bookmarked === 'yes' ? true : false;
      filterdWs = filterdWs.filter((w) => w.bookmarked === b);
    }
    setSearchedWords(filterdWs);
  }, [search, words, bookmarked]);

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
      <div className="flex w-full my-3">
        <div className="w-2/4">
          <label
            for="search"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Search
          </label>
          <input
            id="search"
            className="border-2 p-2 rounded-lg  w-3/4"
            onChange={(e) => setSearch(e.target.value)}
            name="original"
            value={search}
            placeholder="Search by Word, Meaning"
          />
        </div>
        <div class="w-2/4">
          <label
            for="options"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Bookmark
          </label>
          <select
            id="options"
            name="options"
            class="block w-3/4 pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={bookmarked}
            onChange={(e) => setBookmarked(e.target.value)}
          >
            <option value="">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                No.
              </th>
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {searchedWords.map((word, index) => (
              <tr
                key={word._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                >
                  {index + 1}
                </th>
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
                <td className="px-3 py-4">
                  <button
                    className="p-3 hover:bg-slate-300 opacity-70 rounded-full"
                    onClick={() => handleEditWord(word)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="p-3 hover:bg-slate-300  opacity-70 rounded-full mx-4"
                    onClick={() => handleDelete(word._id)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    className="p-3 hover:bg-slate-300  opacity-70 rounded-full"
                    onClick={() => handleSpeaking(word.original)}
                  >
                    <VolumnIcon />
                  </button>
                  <button
                    className="p-3 bg-slate-400 hover:bg-slate-500 opacity-70 rounded ml-4"
                    onClick={() => handleChangeBookmark(word)}
                  >
                    <BookmarkIcon active={word.bookmarked} />
                  </button>
                </td>
              </tr>
            ))}
            {searchedWords.length === 0 && (
              <tr>
                <td className="p-6" colSpan={5}>
                  NO DATA FOUND
                </td>
              </tr>
            )}
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
      <audio ref={audioRef} hidden />
    </div>
  );
};

export default Word;
