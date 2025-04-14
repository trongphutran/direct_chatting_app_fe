import Conversation from "../components/conversation";
import { useState, useEffect } from 'react';
import { Search, Users, UserPlus } from 'lucide-react';

function LeftWindow({
  onUserSelect,
  conversations,
  onSearch,
  searchResults,
  selectedMenu
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("friends");

  const handleSelect = (id, name) => {
    setSelectedId(id);
    onUserSelect(id, name);

  };


  useEffect(() => {
    if (selectedMenu === "messages" && conversations.length > 0) {
      if (selectedId === null || selectedId === "friendsList") {
        const first = conversations[0];
        onUserSelect(first.id, first.name); 
        setSelectedId(first.id); 
      }
    }
  
    if (selectedMenu === "contacts") {
      if (selectedId !== "friendsList" && selectedId !== "invitesList") {
        setSelectedId("friendsList");
        onUserSelect("friendsList");
      }
    }
    
  }, [selectedMenu, conversations, selectedId, onUserSelect]);
  
  
  
  

  const renderConversations = () => {
    const list = searchTerm === "" ? conversations : searchResults;

    if (searchTerm !== "" && searchResults.length === 0) {
      return (
        <div className="text-gray-400 text-center mt-4">
          Không tìm thấy người dùng nào
        </div>
      );
    }

    return list.map((item) => (
      <Conversation
        key={item.id}
        name={item.name}
        message_text={item.text_content}
        id={item.id}
        onUserSelect={handleSelect}
        isSelected={selectedId === item.id}
      />
    ));
  };

  const renderContacts = () => {
    if (searchTerm !== "") {
      if (searchResults.length === 0) {
        return (
          <div className="text-gray-400 text-center mt-4">
            Không tìm thấy người dùng nào
          </div>
        );
      }

      return searchResults.map((item) => (
        <Conversation
          key={item.id}
          name={item.name}
          id={item.id}
          message_text={item.text_content}
          onUserSelect={handleSelect}
          isSelected={selectedId === item.id}
        />
      ));
    }


    return (
      <>
        <div
          className={`group flex justify-between items-center gap-4 p-4 rounded-2xl conversation max-w-96 cursor-pointer transition duration-200 mb-4 h-15
            ${selectedId === "friendsList" ? "bg-blue-300" : "hover:bg-gray-100"}`}
          onClick={() => {
            setSelectedId("friendsList");
            onUserSelect("friendsList");
          }}
        >
          <div className="flex items-center gap-4 flex-grow">
            <Users size={28} />
            <div className="text-center">
              <div className="font-medium text-base truncate max-w-[160px]">Danh sách bạn bè</div>
            </div>
          </div>
        </div>

        <div 
          className={`group flex justify-between items-center gap-4 p-4 rounded-2xl conversation max-w-96 cursor-pointer transition duration-200 h-15 
            ${selectedId === "invitesList" ? "bg-blue-300" : "hover:bg-gray-100"}`}
        onClick={() => {
            setSelectedId("invitesList");
            onUserSelect("invitesList");
          }}
          >
          <div className="flex items-center gap-4 flex-grow">
            <UserPlus size={28} />
            <div className="text-center">
              <div className="font-medium text-base truncate max-w-[160px]">Lời mời kết bạn</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-4 left-window min-w-[57vh] md:w-0 conversation-list overflow-y-auto bg-white rounded-2xl border border-gray-200">
      {/* Thanh tìm kiếm */}
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

      {selectedMenu === "messages" ? renderConversations() : renderContacts()}
    </div>
  );
}

export default LeftWindow;
