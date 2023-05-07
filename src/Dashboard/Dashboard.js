import React, { useEffect } from 'react'
import { collection, doc, getDocs } from "firebase/firestore"; 
import { db } from '../Firebase';

function Dashboard() {

	const loadFanclub = async () => {
		const querySnapshot = await getDocs(collection(db, "fanclub"));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
		});
	}

	useEffect(() => {
		loadFanclub()
	}, [])

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
