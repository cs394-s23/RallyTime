import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, useAuth } from '../Firebase';
import ChatRoom from '../Chat/ChatRoom';
import "./Fanclub.css";
import Navbar from '../Dashboard/Navbar';



function Fanclub() {

	const { docid } = useParams();
	const [fanclubData, setFanclubData] = useState({})
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

	useEffect(() => {
		const checkInClub = async () => {
			if (!!fanclubData.members && !!user && fanclubData.members.size !== 0) {
				const userID = await user.uid
				const fanclubMemberIDs = await new Set(await fanclubData.members)
				console.log(fanclubMemberIDs)
				console.log("mine=",userID)
				if (!fanclubMemberIDs.has(userID)) {
					console.log("adding you to fanclub")
					const newMembers = [...fanclubData.members, userID];
					const docRef = doc(db, "fanclub", docid)
					await updateDoc(docRef, {members: newMembers})
				}
			}
		}
		checkInClub()
	}, [user, fanclubData])

	useEffect(() => {	
		loadFanclub()
	}, [])

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
			<div>
				<h1>Fanclub for {fanclubData.athlete}</h1>
				<h3>Manager: {fanclubData.manager}</h3>
				{/* <div>
					<h3>ChatRoom</h3>
					<ChatRoom docid={docid} data={fanclubData} />
				</div> */}
				<button onClick={copyInviteLink} className="button">
					Copy Invite Link
				</button>
			</div>
			<ChatRoom docid={docid} data={fanclubData} />
		</div>
	)
	
}

export default Fanclub
