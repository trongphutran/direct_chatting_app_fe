import Conversation from "../components/conversation";
import { useState,useEffect } from 'react';
import { Search } from 'lucide-react';

function LeftWindow({ onUserSelect, conversations, onSearch, searchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    if (isFirstLoad && conversations.length > 0) {
        const first = conversations[0];
        onUserSelect(first.id, first.name);
        setIsFirstLoad(false)}}, [conversations, isFirstLoad, onUserSelect]);


  return (
    <div className="p-4 left-window min-w-[57vh] md:w-0 conversation-list overflow-y-auto bg-white rounded-2xl border border-gray-200">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm người dùng"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            onSearch(value);
          }}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <Search size={18} />
        </div>
      </div>
      {searchTerm === "" ? (
        conversations.map((item) => (
          <Conversation
            key={item.id}
            name={item.name}
            message_text={item.text_content}
            id={item.id}
            onUserSelect={onUserSelect}
          />
        ))
      ) : (
        <>
          {searchResults.length === 0 ? (
            <div className="text-gray-400 text-center mt-4">
              Không tìm thấy người dùng nào
            </div>
          ) : (
            searchResults.map((item) => (
              <Conversation
                key={item.id}
                name={item.name}
                message_text={""}
                id={item.id}
                onUserSelect={onUserSelect}
              />
            ))
          )}
        </>
      )}

    </div>
  );
}

export default LeftWindow;
