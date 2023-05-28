import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from '../Firebase';

import './DMListBox.css';



function DM({ docid, data }) {
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('');
  const user = useAuth();

  const loadMessages = () => {
    setMessages(data?.messages || [])
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
  
    const docRef = doc(db, "chat", docid);

    await updateDoc(docRef, { messages: newMessages });
  };

  useEffect(() => {
    loadMessages()
  }, [data])

  if (!!user) {
    return (
        <div className='cont'>
            <div className="box-shadow">

              <h1>DM</h1> <hr/>
              <div className="members">
                <h2 className='group-members'>Members:  </h2>
                <div className="member-list">
                  
                </div>
                <p>{data.members.map((member) => member.displayName).join(", ")}</p>
              </div>


                <div>
                  <span className='chat-backdrop'>
                      {
                        messages.map((message) => (
                          message.userID !== user.uid ? 
                            <div className="border-bottom"><strong className="d-block text-gray-dark">{message.userName}: </strong> <span>{message.content}</span></div> : 
                            <div className="border-bottom">
                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" className="mr-2 rounded" width="32" height="32"/>
                              <strong className="d-block text-gray-dark">You: </strong> <span>{message.content}</span>
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
                className='type-text'
              />
              <button type="submit" disabled={!formValue} className='send-text'>
                Submit
              </button>
            </form>
          </div>
    
        </div>
      );
  } else {
    return (
        <h1>Loading...</h1>
    )
  }

}

export default DM;
