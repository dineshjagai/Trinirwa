import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Participant from './Participant';
import NavBar from '../components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommentInput from '../components/CommentInput';
import CommentDisplayerLive from '../components/CommentDisplayerLive';
import './Room.css';
import {
  addCommentLiveStream,
  getAllCommentsLiveStream,
  // deleteComment,
} from '../components/Module';
import { getCurrentUsername } from '../auth/authServices';

const Room = ({ roomName, room, handleLogout }) => {
  const user = getCurrentUsername();
  const [participants, setParticipants] = useState([]);
  const [comments, setComments] = useState([]);
  const getData = async () => {
    await getAllCommentsLiveStream(roomName).then((res) => {
      console.log(res.data);
    }).catch((err) => console.log(err));
  };
  const postComment = (content) => {
    const timestamp = new Date().toISOString();
    const newComment = {
      roomName,
      user,
      timestamp,
      content,
    };
    setComments((prevComm) => [newComment, ...prevComm]);
    addCommentLiveStream(newComment).then((res) => {
      console.log(res.message);
    }).catch((err) => console.log(err.message));
  };

  const handleComment = (input) => {
    if (input === '') return;
    postComment(input);
  };

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
  useEffect(() => {
    getData();
  });
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
        Live Stream:
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
      <div className="parent-liveStream">
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
        <div className="comment-liveStream">
          <div style={{ height: '200px' }}>
            {comments.map((e) => <div style={{ margin: '4px' }}><CommentDisplayerLive data={e} /></div>)}
          </div>
          <div className="comn-liveStream">
            <CommentInput handleComment={handleComment} />
          </div>
        </div>
      </div>

      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>

  );
};

export default Room;
