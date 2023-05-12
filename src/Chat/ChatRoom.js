import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { doc, updateDoc } from "firebase/firestore";
import "./ChatRoom.css"
import { useAuth } from '../Firebase'


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
    <div className='container'>
      {
        messages.map((message) => (
          message.userID !== user.uid ? <p>{message.userName}: {message.content}</p> : <p>You: {message.content}</p>
        ))
      }
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
