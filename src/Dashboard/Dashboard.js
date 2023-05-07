import React from 'react'
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

  return (
    <div>
      
    </div>
  )
}

export default Dashboard
