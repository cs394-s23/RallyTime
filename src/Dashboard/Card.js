import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

function Card({ docid, doc }) {

  return (
    <div className='card'>
      {/* <p>{docid}</p> */}
      <p>Athlete: {doc.athlete}</p>
      <p>Manager: {doc.manager.displayName}</p>
      <Link to={`/fanclub/${docid}`} className='more-button'>Enter Club</Link>
    </div>
  )
}

export default Card