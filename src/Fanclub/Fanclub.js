import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, useAuth } from '../Firebase';
import ChatRoom from '../Chat/ChatRoom';
import "./Fanclub.css";
import Navbar from '../Dashboard/Navbar';
import DM from '../DM/DM';
import DMListBox from '../DM/DMListBox';
import DMForm from '../DM/DMForm';

function Fanclub() {
	const { docid } = useParams();
	const [fanclubData, setFanclubData] = useState({})
	const [chats, setChats] = useState([])
	const user = useAuth();
	const [isCopied, setIsCopied] = useState(false);
	const loadFanclub = async () => {
		const docRef = doc(db, 'fanclub', docid);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			setFanclubData(docSnapshot.data())
		} else {
			console.log('No such document!');
		}
	}
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
					const userSet = new Set()
					chatSnapshot.data().members.forEach((member) => {
						userSet.add(member.uid)
					})
					//const userSet = new Set(chatSnapshot.data().members);
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

	const copyInviteLink = async () => {
		const inviteLink = await window.location.href;
		try {
			await navigator.clipboard.writeText(inviteLink);
			setIsCopied(true); // Set copied status to true
			console.log('Copied link:', inviteLink);
			setTimeout(() => {
				setIsCopied(false); // Reset copied status after 2 seconds
			}, 1000);
		} catch (error) {
			console.log('Failed to copy:', error);
		}
	};

	useEffect(() => {
		const checkInClub = async () => {
			if (!!fanclubData.members && !!user && fanclubData.members.size !== 0) {
				const userID = await user.uid
				const userName = await user.displayName
				const currUser = {
					uid: userID,
					displayName: userName
				}
				const fanclubMemberIDs = new Set()
				const fanclubMembers = await fanclubData.members
				fanclubMembers.forEach(member => {
					fanclubMemberIDs.add(member.uid)
				})
				// console.log(fanclubMemberIDs)
				// console.log("mine=",userID)
				if (!fanclubMemberIDs.has(userID)) {
					console.log("adding you to fanclub")

					const newMembers = [...fanclubData.members, currUser];
					const docRef = doc(db, "fanclub", docid)
					await updateDoc(docRef, { members: newMembers })
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
	}, [user])

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
			<div className='page-container'>
				<div className='chat-sidebar'>
					{
						chats.length > 0 ? chats.map((chat) => (
							<DMListBox docid={chat.id} data={chat.data()} className='DM-list' />
						)) : <p>DM Not Loaded</p>
					}
				</div>
				<div className='main-chat'>
					<div className='info'>
						<h1>Fanclub for {fanclubData.athlete}</h1>
						<h3>Manager: {fanclubData.manager}</h3>
						<button onClick={copyInviteLink} className={`invite_link ${isCopied ? 'copied' : ''}`}>
							{isCopied ? 'Copied!' : 'Copy Invite Link'}
						</button>
					</div>
					<ChatRoom docid={docid} data={fanclubData} />
				</div>
				<DMForm fanclubID={docid} fanclubData={fanclubData} />
			</div>
		</div>
	)
}
export default Fanclub