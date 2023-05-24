import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, useAuth } from '../Firebase';
import ChatRoom from '../Chat/ChatRoom';
import "./Fanclub.css";
import Navbar from '../Dashboard/Navbar';
import DM from '../DM/DM';


function Fanclub() {

	const { docid } = useParams();
	const [fanclubData, setFanclubData] = useState({})
	const [chats, setChats] = useState([])
	const user = useAuth();

	const loadFanclub = async () => {
		const docRef = doc(db, 'fanclub', docid);
		const docSnapshot = await getDoc(docRef);
		
		if (docSnapshot.exists()) {
			await setFanclubData(docSnapshot.data())
		} else {
			console.log('No such document!');
		}			
	}

	// const loadDMs = async () => {
	// 	if (!!user) {
	// 		const userID = await user.uid
	// 		const docRef = doc(db, 'fanclub', docid);
	// 		const docSnapshot = await getDoc(docRef);
	// 		const chatDocs = [];
	// 		const directMessageIDs = docSnapshot.data().direct_messages
	// 		directMessageIDs.forEach(async (directMessageID) => {
	// 			const chatRef = doc(db, 'chat', directMessageID);
	// 			const chatSnapshot = await getDoc(chatRef);
	// 			const userSet = new Set(chatSnapshot.data().members)
	// 			if (userSet.has(userID))
	// 				chatDocs.push(chatSnapshot);
	// 		});
	// 		setChats(chatDocs);
	// 		// chats.forEach(chat => {
	// 		// 	console.log("Chats=",chat.data())
	// 		// })
			
	// 	}

	// }

	const loadDMs = async () => {
		if (!!user) {
		  const userID = await user.uid;
		  const docRef = doc(db, 'fanclub', docid);
		  const docSnapshot = await getDoc(docRef);
		  const directMessageIDs = docSnapshot.data().direct_messages;
		  const chatDocs = await Promise.all(
			directMessageIDs.map(async (directMessageID) => {
			  const chatRef = doc(db, 'chat', directMessageID);
			  const chatSnapshot = await getDoc(chatRef);
			  const userSet = new Set(chatSnapshot.data().members);
			  if (userSet.has(userID)) {
				return chatSnapshot;
			  }
			  return null;
			})
		  );
		  const filteredChats = chatDocs.filter((chat) => chat !== null);
		  setChats(filteredChats);
		}
	  };
	  

	useEffect(() => {
		const checkInClub = async () => {
			if (!!fanclubData.members && !!user && fanclubData.members.size !== 0) {
				const userID = await user.uid
				const fanclubMemberIDs = await new Set(await fanclubData.members)
				// console.log(fanclubMemberIDs)
				// console.log("mine=",userID)
				if (!fanclubMemberIDs.has(userID)) {
					console.log("adding you to fanclub")
					const newMembers = [...fanclubData.members, userID];
					const docRef = doc(db, "fanclub", docid)
					await updateDoc(docRef, {members: newMembers})
				}
			}
		}
		checkInClub()
	}, [user, fanclubData, docid])

	useEffect(() => {	
		loadFanclub()
	}, [])

	useEffect(() => {
		loadDMs()
	}, [user, chats])

	const copyInviteLink = async () => {
		const inviteLink = await window.location.href;
		try {
			await navigator.clipboard.writeText(inviteLink)
			console.log('Copied link:', inviteLink)
		} 
		catch (error) {
			console.log('Failed to copy:', error)
		}
	}
	
	return (
		<div>
			<Navbar />
			<div className='info'>
				<h1>Fanclub for {fanclubData.athlete}</h1>
				<h3>Manager: {fanclubData.manager}</h3>
				<button onClick={copyInviteLink} className='invite_link'>
					Copy Invite Link
				</button>

			</div>
			<ChatRoom docid={docid} data={fanclubData} />
			{
				chats.length > 0 ? chats.map((chat) => (
					<DM docid={chat.id} data={chat.data()}/>
				)) : <p>DM Not Loaded</p>
			}
		</div>
	)
	
}

export default Fanclub