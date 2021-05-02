import React from 'react';

export default function Follower({ info }) {
  return (
    <div style={{
      marginTop: '10px',
      marginLeft: '10px',
    }}
    >
      <img
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '100px',
        }}
        src={info.profile_picture}
        alt=""
      />
      <p
        style={{
          margin: 'auto',
        }}
      >
        {info.username}
      </p>
    </div>
  );
}
