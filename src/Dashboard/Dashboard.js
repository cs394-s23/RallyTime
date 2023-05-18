import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import Card from './Card';
import { useAuth } from '../Firebase';
import "./Dashboard.css";
import Navbar from './Navbar';

function Dashboard() {
  const [fanclubs, setFanclubs] = useState([]);
  const [filteredFanclubs, setFilteredFanclubs] = useState([]);
  const user = useAuth();

  async function loadFanclub() {
    const querySnapshot = await getDocs(collection(db, "fanclub"));
    const fanclubDocs = [];
    querySnapshot.forEach((doc) => {
      fanclubDocs.push(doc);
    });
    setFanclubs(fanclubDocs);
  }

  async function filterFanclubs() {
    const userID = await user.uid;
    const activeFanclubs = [];
    fanclubs.forEach((fanclubDoc) => {
      const fanclubData = fanclubDoc.data();
      const fanclubMemberIDs = new Set(fanclubData.members);
      if (fanclubMemberIDs.has(userID)) {
        activeFanclubs.push(fanclubDoc);
      }
    });
    setFilteredFanclubs(activeFanclubs);
  }

  useEffect(() => {
    loadFanclub();
  }, []);

  useEffect(() => {
    filterFanclubs();
  }, [user, fanclubs]);

  return (
    <>
    <Navbar />
    <h1>Dashboard</h1>
    <div className='container'>
      <h2>Your Clubs</h2>
      <div className='fanclub'>

      {filteredFanclubs.map((fanclub) => (
        <Card docid={fanclub.id} doc={fanclub.data()} />
      ))}
      </div>
    </div>
    </>
  );
}

export default Dashboard;