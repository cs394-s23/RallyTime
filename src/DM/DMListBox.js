import React, { useState } from 'react';
import DM from './DM.js';
import './DMListBox.css';

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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <DM docid={docid} data={data} />

            

             
          </div>
        </div>
      )}
    </div>
  );
}

export default DMListBox;
