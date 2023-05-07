import React from 'react'

function Card({ docid, doc }) {
  return (
    <div>
      <p>{docid}</p>
      <p>{doc.athlete}</p>
      <p>{doc.manager}</p>
    </div>
  )
}

export default Card
