import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../Firebase';
import Card from './Card';

function Dashboard() {

	const [fanclubs, setFanclubs] = useState([])

	const loadFanclub = async () => {
		const querySnapshot = await getDocs(collection(db, "fanclub"));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, " => ", doc.data());
			setFanclubs([...fanclubs, doc])
		});
	}

	const renderFanclub = () => {
		return fanclubs.map((fanclubDoc) => {
			// console.log(fanclubDoc.id, " => ", fanclubDoc.data());
			return <Card docid={fanclubDoc.id} doc={fanclubDoc.data()} />
	})
	}

	useEffect(() => {
		loadFanclub()
	}, [])

  return (
    <div>
      <h1>Dashboard</h1>
			{renderFanclub()}
    </div>
  )
}

export default Dashboard
