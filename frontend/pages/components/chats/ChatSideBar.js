import DeleteIcon from '@/components/icons/DeleteIcon';

const ChatSideBar = ({
  chats,
  handleResetChat,
  handleViewChat,
  handleDeleteChat,
}) => {
  return (
    <>
      <button
        className="self-center border-gray-300 border-2 rounded-lg p-1 m-2 w-5/6 hover:bg-slate-100"
        onClick={handleResetChat}
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
    </>
  );
};

export default ChatSideBar;
