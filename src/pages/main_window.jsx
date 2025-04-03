import Header from "../layout_components/header";
import LeftWindow from "../layout_components/LeftWindow";
import RightWindow from "../layout_components/RightWindow";
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";

function MainWindow(){

    const [user_id, setId] = useState(useParams().id);
    const [username, setUsername] = useState("")
    const [selected_id, setSelectedId] = useState(0);
    const [chat_history, setChatHistory] = useState([]);
    const [conversations, setConversations] = useState([]);

    console.log(chat_history)

    const handleSelectId = (select_id, username) =>{
        console.log("selected id: " + select_id)
        setSelectedId(s => select_id)
        setUsername(username)
    };

    

    useEffect(() => {
        var ws = new WebSocket(`ws://localhost:8000/ws/${user_id}`);
        ws.onmessage = function(event) {
            console.log(event.data);
            var message = JSON.parse(event.data);
            setChatHistory(c => [...c, message]);
        };

        fetch(`http://localhost:8000/users/${user_id}/conversations`)
        .then((response) => {
            console.log("get success")
            response.json().then((data) => {
                console.log(data);
                setConversations(data);
            });
        });


    }, [user_id]);

    useEffect(() => {
        fetch(`http://localhost:8000/messages/?user_id_1=${user_id}&user_id_2=${selected_id}`)
        .then((response) => {
            console.log("get success")
            response.json().then((data) => {
                console.log(data);
                setChatHistory(data);
            });
        });
    }, [selected_id])

    const sendMessage = (e, message) =>{
        e.preventDefault();
        if(message === ""){
            return;
        }

        fetch(`http://localhost:8000/messages/`, {
            method: 'POST',
            body: JSON.stringify({
              sender_id : user_id,
              contact_id : selected_id,
              text_content : message,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json().then((data) =>{
                console.log(`you send: ${data}`);
                setChatHistory(c => [...c, data]);
        }));
    };


    return (<>
        <div className="_main rounded-2xl" >
            <Header username={username} />   
            <div className="flex gap-0.5">
                <LeftWindow user_id={user_id} conversations={conversations} onUserSelect={handleSelectId}/>
                {selected_id!=0 ? <RightWindow chat_history={chat_history} user_id={user_id} sendMessage={sendMessage} /> : null}  
            </div>         
        </div>
    </>);
}
export default MainWindow;




