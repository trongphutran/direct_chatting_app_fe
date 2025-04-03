import ChatBar from "../components/ChatBar";
import {useState, useEffect, useRef} from 'react'

function RightWindow({user_id, sendMessage, chat_history}){

    const chatEndRef = useRef(null);
    // TODO: them xu ly cuon xuong tin nhan moi nhat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [chat_history, user_id])

    return (
        <div className="w-full flex flex-col h-[70vh] bg-white rounded-2xl border-1 border-gray-200">
            <div className="flex-1 p-4 overflow-y-auto pb-4">
                {chat_history.map((item) => (
                    <div key={item.id} className={`text-sm w-fit max-w-lg rounded-xl mb-2 p-2 ${user_id == item.sender_id ? "bg-green-800 ml-auto text-gray-200 text-right" :"bg-gray-200 mr-auto text-black text-left"}`}>{item.text_content}</div>
                ))
                }
                <div ref={chatEndRef} />
            </div>
            <ChatBar sendMessage={sendMessage}/>
        </div>
    );
}
export default RightWindow;