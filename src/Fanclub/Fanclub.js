import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase';

import ChatRoom from '../Chat/ChatRoom';
import "./Fanclub.css"

function Fanclub() {

	const { docid } = useParams();

	const [fanclubData, setFanclubData] = useState({})

	const loadFanclub = async () => {
		const docRef = doc(db, 'fanclub', docid);
		const docSnapshot = await getDoc(docRef);
	
		if (docSnapshot.exists()) {
			// console.log('Document data:', docSnapshot.data());
			setFanclubData(docSnapshot.data())
		} else {
			console.log('No such document!');
		}	
	}

	useEffect(() => {
		loadFanclub()
	}, [])

  return (
    <div className='container'>
      <h1>Fanclub for {fanclubData.athlete}</h1>
			<h3>Manager: {fanclubData.manager}</h3>
			<div>
				<h3>ChatRoom</h3>
				<ChatRoom docid={docid} data={fanclubData} />
			</div>
    </div>
  )
}

export default Fanclub