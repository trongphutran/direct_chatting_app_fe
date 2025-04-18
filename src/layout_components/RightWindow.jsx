import ChatBar from "../components/ChatBar";
import Conversation from "../components/conversation"; 
import Invite from "../components/invite";

import {useState, useEffect, useRef} from 'react'

function RightWindow({ user_id, sendMessage, chat_history,selected_id,onUserSelect,Unfriend,AcpFriend,AddFriend,friends,username}) {
    const chatEndRef = useRef(null);
    const [isRequestSent, setRequestSent] = useState(false);
    const isFriend = friends.some(friend => friend.id === selected_id);
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat_history, user_id]);
    useEffect(() => {
      setRequestSent(false);
    }, [selected_id]);
    if (selected_id === "friendsList") {
      const friends = Array.isArray(chat_history)
        ? chat_history.map((friend) => ({
            id: friend.id,
            name: friend.name,
          }))
        : [];
  
      if (selected_id ==="friendsList" && friends.length > 0) {
        return (
          <div className="w-full flex flex-col h-[70vh] bg-white rounded-2xl border border-gray-200 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Danh sách bạn bè</h2>
            <div className="space-y-2">
              {friends.map((friend) => (
                <Conversation
                  key={friend.id}
                  id={friend.id}
                  name={friend.name}
                  message_text="Bắt đầu trò chuyện"
                  onUserSelect={onUserSelect}
                  isSelected={false}
                  AddFriend={AddFriend}
                  Unfriend={Unfriend}
                  friends={friends}
                />
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="w-full flex flex-col h-[70vh] bg-white rounded-2xl border border-gray-200 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Danh sách bạn bè</h2>
            <div className="text-gray-400 text-center mt-4">Không có bạn bè nào để hiển thị.</div>
          </div>
        );
      }
      
    } 
      if (selected_id==="invitesList"){
        const friends = Array.isArray(chat_history)
        ? chat_history.map((friend) => ({
            id: friend.id,
            name: friend.name,
          }))
        : [];
        if (selected_id ==="invitesList" && friends.length > 0) {
          return(
        <div className="w-full flex flex-col h-[70vh] bg-white rounded-2xl border border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Danh sách lời mới kết bạn</h2>
        <div className="space-y-2">
              {friends.map((friend) => (
                <Invite
                key={friend.id}
                id={friend.id}
                name={friend.name}
                onAccept={() => AcpFriend(friend.id)}
                onReject={(id) => Unfriend(friend.id)}
                />
              ))}
              
            </div>
      </div>
      )} if(selected_id ==="invitesList" && friends.length == 0) {
        return (
          <div className="w-full flex flex-col h-[70vh] bg-white rounded-2xl border border-gray-200 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Danh sách lời mời kết bạn</h2>
            <div className="text-gray-400 text-center mt-4">Không có lời mời kết bạn để hiển thị.</div>
          </div>
        );
      }
      }
      else {
    // Hiển thị khung chat mặc định
return (

  <div className="w-full flex flex-col h-[70vh] bg-white rounded-2xl border-1 border-gray-200">
      
      {!isFriend && selected_id && (
  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 border-b border-yellow-300 flex items-center justify-between">
    <span>Bạn và {username} chưa là bạn bè.</span>
    {!isRequestSent ? (
      <button
        onClick={() => {
          AddFriend(selected_id);
          setRequestSent(true);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg text-sm"
      >
        Kết bạn
      </button>
    ) : (
      <button
        disabled
        className="bg-gray-300 text-gray-600 font-semibold py-1 px-3 rounded-lg text-sm cursor-not-allowed"
      >
        Đã gửi lời mời kết bạn
      </button>
    )}
  </div>
)}

  <div className="w-full flex flex-col h-[70vh] bg-white rounded-2xl border-1 rounded-t-none border-gray-200">
    <div className="flex-1 p-4 overflow-y-auto pb-4">
      {Array.isArray(chat_history) &&
        chat_history.map((item) => (
          <div
            key={item.id}
            className={`text-sm w-fit max-w-lg rounded-xl mb-2 p-2 ${
              user_id == item.sender_id
                ? "bg-green-800 ml-auto text-gray-200 text-right"
                : "bg-gray-200 mr-auto text-black text-left"
            }`}
          >
            {item.text_content}
          </div>
        ))}
      <div ref={chatEndRef} />
    </div>
    <ChatBar sendMessage={sendMessage} />
  </div>
  </div>
);
  }}
  
export default RightWindow;