import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getWords } from '@/utils/api';
import moment from 'moment';

const Word = () => {
  const [words, setWords] = useState([]);

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

  return (
    <div className="chat-container p-8 bg-zinc-200">
      <Head>
        <title>Words</title>
        <meta property="og:title" content="Words" key="title" />
      </Head>
      <div className="font-bold text-2xl mb-8">Word List</div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-3 py-3">
                Word
              </th>
              <th scope="col" class="px-3 py-3">
                Meaning
              </th>
              <th scope="col" class="px-3 py-3">
                Created at
              </th>
              <th scope="col" class="px-3 py-3">
                Bookmark
              </th>
              <th scope="col" class="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr
                key={word._id}
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                >
                  {word.original}
                </th>
                <td class="px-3 py-4 capitalize">{word.translated}</td>
                <td class="px-3 py-4">
                  {moment(word.created_at).format('YYYY-MM-DD HH:mm:ss')}
                </td>
                <td class="px-3 py-4">{word.bookmarked}</td>
                <td class="px-3 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Word;
