import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { doc, updateDoc } from "firebase/firestore";


function ChatRoom({ docid, data }) {
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('');

  const loadMessages = () => {
    setMessages(data?.group_messages || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newMessage = formValue;
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
    <div>
      {
        messages.map((message) => (
          <p>{message}</p>
        ))
      }
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
  );
}

export default ChatRoom;
