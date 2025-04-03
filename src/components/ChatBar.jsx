import EmoteButton from "../assets/Group 6.png"
import AttachmentButton from "../assets/Group.png"
import { useState } from "react"

function ChatBar({sendMessage}){
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    //TODO: xu ly khi gui tin nhan
    const handleSendMessage = (e, message) =>{
        e.preventDefault();
        if (message.trim()) {
            sendMessage(e, message);
            setMessage("");
        }
        
    }

    return (
        <div className="w-full flex flex-col">
            <form>
                <div className="flex w-3xl p-3 chat-bar rounded-xl m-4 bottom-0">
                    <input 
                        className="placeholder-gray-400 bg-gray-100 rounded-xl w-full p-2" 
                        placeholder="Type your text here" 
                        value={message} 
                        onChange={(e) => handleMessageChange(e)} 
                        onKeyDown={(e) => {if (e.key === "Enter") handleSendMessage(e, message)}}
                    />

                    <button type="submit" className="w-10 cursor-pointer" id ="send-button" onClick={(e) => handleSendMessage(e, message)}>
                        <svg viewBox="0 -0.5 25 25" fill="#016630" xmlns="http://www.w3.org/2000/svg" stroke="#016630">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path fillRule="evenodd" clipRule="evenodd" 
                            d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91714 11.8809 7.85789 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.5 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834V9.8834Z" 
                            stroke="#016630" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"></path>
                        </g>
                        </svg>
                    </button>
                </div>           
            </form>
        </div>
    );
}
export default ChatBar;