import React from 'react'
import { useState } from 'react';
import DM from "./DM.js";

function DMListBox({ docid, data }) {

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
    <button onClick={openModal}>{docid}</button>
    {showModal && (
        <DM
          docid={docid}
          data={data}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default DMListBox;
