import React from 'react';
import './ScrollDialog.css';

export default function ScrollDialog() {
  const handleClickOpen = () => {
    document.getElementById('MyModal').setAttribute('display', 'none');
  };
  return (
    <div>
      <button className="btn" id="delete" style={{ color: '#00695c', border: 'none', backgroundColor: 'inherit' }} onClick={() => handleClickOpen()} type="button"> All followers</button>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </div>
  );
}
