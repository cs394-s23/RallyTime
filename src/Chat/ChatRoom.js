import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { doc, updateDoc } from "firebase/firestore";
import "./ChatRoom.css";
import { useAuth } from '../Firebase';
import LikeButton from './Like.jsx';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';



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

    // Update the class of the heart button
    const heartButton = document.getElementById(`heart-button-${index}`);
    if (heartButton) {
      heartButton.classList.toggle('clicked');
    }

    await updateDoc(docRef, { group_messages: newMessages });
  }


  useEffect(() => {
    loadMessages()
  }, [data])

  return (
      <div className='cont'>
      <div className="box-shadow">
            <h1>Message Board</h1> <hr/>
              <div>
                <span className='chat-backdrop'>
                    {
                      messages.map((message, index) => (
                        message.userID !== user.uid ? 
                          <div className="border-bottom">
                            <strong className="d-block text-gray-dark">{message.userName}: </strong>
                            <span>{message.content}</span>
                            <button
                              id={`heart-button-${index}`} // Unique ID for each heart button
                              onClick={() => handleLike(message)}
                              className={`heart ${message.likes.includes(user.uid) ? 'clicked' : ''}`}
                              
                            >
                              <FontAwesomeIcon icon={message.likes.includes(user.uid) ? filledHeart : emptyHeart} />
                            </button>
                            <div>Likes: {message.likes ? message.likes.length : 0}</div>
                          </div> :
                          <div className="border-bottom">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" className="mr-2 rounded" width="32" height="32" />
                            <strong className="d-block text-gray-dark">You: </strong>
                            <span>{message.content}</span>
                            <button
                              id={`heart-button-${index}`} // Unique ID for each heart button
                              onClick={() => handleLike(message)}
                              className={`heart ${message.likes.includes(user.uid) ? 'clicked' : ''}`}
                              
                            >
                              <FontAwesomeIcon icon={message.likes.includes(user.uid) ? filledHeart : emptyHeart} />
                            </button>
                            <div>Likes: {message.likes ? message.likes.length : 0}</div>
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
              Send
            </button>
    
          </form>
        </div>
      </div>
  );
}

export default ChatRoom;
