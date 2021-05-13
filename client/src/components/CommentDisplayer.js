import React, { useState } from 'react';

export default function CommentDisplayer() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <button onClick={handleClick} type="button">comments</button>
      </div>
      <div style={{ display: isOpen ? 'block' : 'none' }} className="content">
        <span>ahahhahdahdahdha</span>
        <br />
        <span>ahahhahdahdahdha</span>
        <br />
        <span>ahahhahdahdahdha</span>
        <br />
        <span>ahahhahdahdahdha</span>
      </div>
    </div>
  );
}
