import Conversation from "../components/conversation";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'

function LeftWindow({onUserSelect, conversations}){
    
    return (
        <div className="p-4 left-window min-w-[57vh] conversation-list overflow-y-auto bg-white rounded-2xl border-1 border-gray-200">
            
                {conversations.map((item) => (
                       
                        <Conversation 
                            key={item.id} 
                            name={item.name} 
                            message_text={item.text_content} 
                            id={item.id} 
                            onUserSelect={onUserSelect}
                        />
                ))}
            
                
        </div>
    );
}
export default LeftWindow;