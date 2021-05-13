import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Participant from './Participant';
import NavBar from '../components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
    };

    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (

    <div className="room">
      <NavBar />
      <div
        style={{
        }}
      />
      <h2>
        Room:
        {' '}
        {roomName}
      </h2>
      <Button
        color="secondary"
        startIcon={<ExitToAppIcon />}
        type="submit"
        className="btn btn-primary w-100"
        onClick={handleLogout}
      >
        Leave Stream

      </Button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </div>

      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>

  );
};

export default Room;
