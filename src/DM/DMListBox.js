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
      {/* <span className="dm-list">Your DMs</span> */}
      <br></br>
      <button onClick={openModal} className='one-DM'>{data.members[0].displayName}</button>
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
