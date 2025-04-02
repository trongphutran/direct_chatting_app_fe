import Conversation from "../components/conversation";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'

function LeftWindow({onUserSelect, conversations}){
    
    return (
        <div className="p-4 left-window w-6/12 conversation-list overflow-y-auto">
            
                {conversations.map((item) => (
                        <Conversation key={item.id} name={item.name} message_text={item.text_content} id={item.id} onUserSelect={onUserSelect}/>
                    ))}
            
                
        </div>
    );
}
export default LeftWindow;