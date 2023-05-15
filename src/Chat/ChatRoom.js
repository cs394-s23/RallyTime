import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { doc, updateDoc } from "firebase/firestore";
import "./ChatRoom.css";
import { useAuth } from '../Firebase';


function ChatRoom({ docid, data }) {
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('');
  const user = useAuth();

  const loadMessages = () => {
    setMessages(data?.group_messages || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = await user.uid
    const userName = await user.displayName
  
    const newMessage = {
      userID: userID,
      userName: userName,
      content: formValue
    };

    setFormValue("");
  
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  
    const docRef = doc(db, "fanclub", docid);

    await updateDoc(docRef, { group_messages: newMessages });
  };
  

  useEffect(() => {
    loadMessages()
  }, [data])

  return (
    <div className='cont'>
        <div class="box-shadow">
          <h1>Message Board</h1> <hr/>
            <div>
              <span>
                  {
                    messages.map((message) => (
                      message.userID !== user.uid ? 
                        <div class="border-bottom"><strong class="d-block text-gray-dark">{message.userName}: </strong> <span>{message.content}</span></div> : 
                        <div class="border-bottom">
                          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="mr-2 rounded" width="32" height="32"/>
                          <strong class="d-block text-gray-dark">You: </strong> <span>{message.content}</span>
                        </div>
                    ))
                  }
              </span>
            </div>
        </div>
      <div className='chatroom'>
        <form onSubmit={handleSubmit}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message"
          />
          <button type="submit" disabled={!formValue}>
            Submit
          </button>
        </form>
      </div>

    </div>
  );
}

export default ChatRoom;
