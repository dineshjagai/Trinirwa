import React from 'react';
import NavBar from '../components/navBar';

const Lobby = ({
  username,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <NavBar />
      <div className="home">
        <div
          style={{
          }}
        />

        <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
          <div className="container mx-1">
            <div className="card-body p-xs">
              <h2 className="card-title text-center font-weight-bold">Live Stream</h2>
              <div className="form-group">
                <h2>Enter a room</h2>
                <div>
                  <label htmlFor="name">
                    {' '}
                    Hi,
                    {' '}
                    {username}
                    , please select a room to start your live stream!

                  </label>
                </div>
                <label htmlFor="room">Room name:</label>
                <input
                  type="text"
                  id="room"
                  placeholder="Enter Room Name"
                  value={roomName}
                  onChange={handleRoomNameChange}
                  readOnly={connecting}
                  required
                />
              </div>
              <div className="video-group">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={connecting}
                >
                  {connecting ? 'Connecting' : 'Join'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
);

export default Lobby;
