import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { doc, updateDoc } from "firebase/firestore";
import "./ChatRoom.css";
import { useAuth } from '../Firebase';


function ChatRoom({ docid, data }) {
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('');
  const [likes, setLike] = useState([]);
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
      content: formValue,
      likes: []
    };

    setFormValue("");

   
  
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // const newLikes = { ...likes, [newMessages.length - 1]: [] };
    // setLikes(newLikes);

  
    const docRef = doc(db, "fanclub", docid);


    await updateDoc(docRef, { group_messages: newMessages });
  };

  const handleLike = async (message) => {
    const userID = await user.uid;
    const index = messages.indexOf(message);
    const docRef = doc(db, "fanclub", docid);
    // const likedMessage = messages[index]


    const likesSet = new Set(message.likes); // Convert likes array to a Set

    if (likesSet.has(userID)) {
      likesSet.delete(userID); // Unliking the message
    } else {
      likesSet.add(userID); // Liking the message
    }
    const newLikesArray = Array.from(likesSet); // Convert the Set back to an array
    const newMessage = { ...message, likes: newLikesArray };

    const newMessages = [...messages.slice(0, index), newMessage, ...messages.slice(index + 1)];
    setMessages(newMessages);
    setLike(newLikesArray); // Update the likes state with the new array

    await updateDoc(docRef, { group_messages: newMessages });
  }


  useEffect(() => {
    loadMessages()
  }, [data])

  return (
    <div className='cont'>
        <div class="box-shadow">
          <h1>Message Board</h1> <hr/>
            <div>
              <span className='chat-backdrop'>
                  {
                    messages.map((message) => (
                      message.userID !== user.uid ? 
                        <div class="border-bottom"><strong class="d-block text-gray-dark">{message.userName}: </strong> <span>{message.content}</span></div> : 
                        <div class="border-bottom">
                          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="mr-2 rounded" width="32" height="32"/>
                          <strong class="d-block text-gray-dark">You: </strong> <span>{message.content}</span>
                          <button onClick={() => handleLike(message)}>Like</button>
                          {/* <span>{message.likes.length}</span> */}
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
}

export default ChatRoom;
