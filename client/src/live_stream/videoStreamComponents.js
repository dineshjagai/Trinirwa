import React from 'react';
import VideoChat from './VideoChat';
import './videoStreamComponents.css';

export default function VideoStreamComponent() {
  return (
    <div className="videochat">
      <header>
        <h1>Live Stream Chat</h1>
      </header>
      <main>
        <VideoChat />
      </main>
    </div>

  );
}
