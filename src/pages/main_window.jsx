import Header from "../layout_components/header";
import LeftWindow from "../layout_components/LeftWindow";
import RightWindow from "../layout_components/RightWindow";
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import LeftMenu from "../layout_components/LeftMenu";
function MainWindow(){

    const [user_id, setId] = useState(useParams().id);
    const [username, setUsername] = useState("")
    const [selected_id, setSelectedId] = useState(0);
    const [chat_history, setChatHistory] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("messages");
    const [friends, setFriends] = useState([]);

    console.log(chat_history)

    const handleSelectId = (select_id, username = "") => {
  if (select_id === "friendsList") {
    fetch(`http://localhost:8000/contacts/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setChatHistory(data);
        setUsername("Danh sách bạn bè");
        setSelectedId("friendsList");
      });
  } else if (select_id === "invitesList") {
    fetch(`http://localhost:8000/contacts/${user_id}/pending_requests`)
      .then((res) => res.json())
      .then((data) => {
        setChatHistory(data);
        setUsername("Danh sách lời mời kết bạn");
        setSelectedId("invitesList");
      });
  } else {
    setSelectedId(select_id);
    setUsername(username);
  }
};

    useEffect(() => {
      if (user_id) {
          fetch(`http://localhost:8000/contacts/${user_id}`)
              .then((res) => res.json())
              .then((data) => {
                  setFriends(data);
                  console.log("Friends data: ", data);             })
              .catch((error) => {
                  console.error("Error fetching friends:", error);
              });
      }
  }, [user_id]); 

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
                console.log("conversation: ",data);
                setConversations(data);
            });
        });


    }, [user_id]);

    useEffect(() => {
      if (selected_id === "friendsList") {
        fetch(`http://localhost:8000/contacts/${user_id}`)
          .then((res) => res.json())
          .then((data) => {
            setChatHistory(data);  
          });
      } else if (selected_id === "invitesList") {
        fetch(`http://localhost:8000/contacts/${user_id}/pending_requests`)
          .then((res) => res.json())
          .then((data) => {
            setChatHistory(data);  
          });
      } else {
        fetch(`http://localhost:8000/messages/?user_id_1=${user_id}&user_id_2=${selected_id}`)
          .then((response) => response.json())
          .then((data) => {
            setChatHistory(data);  
          });
      }
    }, [selected_id, user_id]);
    
  

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

    
    const searchUsers = async (query) => {
        try {
          const response = await fetch(`http://localhost:8000/users/?query=${encodeURIComponent(query)}`);
          if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
            console.log("Search results:", data);
          } else {
            console.error("Search failed:", response.status);
          }
        } catch (error) {
          console.error("Error during search:", error);
        }
      };      
      const handleSearchQuery = (query) => {
        console.log("Searching for:", query);
        if (query === "") {
          setSearchResults([]);
        } else {
          searchUsers(query);
        }
      };
      
      const Unfriend = async (other_user_id) => {
        try {
          const response = await fetch(`http://localhost:8000/contacts/?user_id=${user_id}&other_user_id=${other_user_id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
            },
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log("Unfriended:", result);
            if (selected_id === "friendsList") {
              fetch(`http://localhost:8000/contacts/?user_id=${user_id}`)
                .then(res => res.json())
                .then(data => setChatHistory(data));
            }
          } else {
            console.error("Unfriend failed:", response.status);
          }
        } catch (error) {
          console.error("Error during unfriend:", error);
        }
      };
      

      const AcpFriend = async (contact_user_id) => {
        const requestData = {
          user_id: contact_user_id,
          contact_user_id: user_id
        };
      
        console.log("Request data:", requestData); 
      
        try {
          const response = await fetch(`http://localhost:8000/contacts/`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result.message);
      

            if (selected_id === "invitesList") {
              fetch(`http://localhost:8000/contacts/${user_id}/pending_requests`)
                .then(res => res.json())
                .then(data => setChatHistory(data));
            }
          } else {
            console.error("Lỗi khi đồng ý kết bạn:", response.status);
          }
        } catch (error) {
          console.error("Lỗi khi đồng ý kết bạn:", error);
        }
      };
      
      const AddFriend = async (contact_user_id) => {
        const requestData = {
          user_id: user_id,
          contact_user_id:contact_user_id
        };
      
        console.log("Request data:", requestData); 
      
        try {
          const response = await fetch(`http://localhost:8000/contacts/`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result.message);
          } else {
            console.error("Lỗi khi kết bạn:", response.status);
          }
        } catch (error) {
          console.error("Lỗi khi kết bạn:", error);
        }
      };
      

    return (<>
    <div className="flex gap-0.5">
      <LeftMenu onSelectMenu={setSelectedMenu} />
      
        <div className="_main rounded-2xl w-full" >
            <Header username={username} selectedMenu={selectedMenu} selectedId={selected_id}/>   
            
            <div className="flex gap-0.5">
            
                <LeftWindow user_id={user_id} conversations={conversations} onUserSelect={handleSelectId}  onSearch={handleSearchQuery} searchResults={searchResults}  selectedMenu={selectedMenu} selectedId={selected_id} friends={friends} AddFriend={AddFriend}
  Unfriend={Unfriend} />
                {selected_id!=0 ? <RightWindow chat_history={chat_history} user_id={user_id} sendMessage={sendMessage} selected_id={selected_id} onUserSelect={handleSelectId} Unfriend={Unfriend} AcpFriend={AcpFriend} friends={friends} AddFriend={AddFriend} username={username} /> : null}  
            </div>         
        </div>
        </div>
    </>);
    
}
export default MainWindow;




