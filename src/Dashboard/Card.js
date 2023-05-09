import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

function Card({ docid, doc }) {

  return (
    <div className='card'>
      {/* <p>{docid}</p> */}
      <p>Athlete: {doc.athlete}</p>
      <p>Manager: {doc.manager}</p>
      <Link to={`/fanclub/${docid}`}>See More</Link>
    </div>
  )
}

export default Card