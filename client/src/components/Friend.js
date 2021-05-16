import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import './Follower.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1.5),
      borderRadius: '100%',
      padding: 0,
      overflow: 'none',
    },
  },
}));

export default function Friend({
  info, handleB, handleMessage, handleU,
}) {
  const classes = useStyles();
  return (
    <div className="Container_two">
      <div className={classes.root}>
        <Tooltip title="Message" placement="top">
          <ChatIcon fontSize="small" className="button" onClick={() => handleMessage(info.username)} />
        </Tooltip>
        <Tooltip title="Block user" placement="top">
          <BlockIcon fontSize="small" className="button" color="secondary" onClick={() => handleB(info.username)} />
        </Tooltip>
        <Tooltip title="Unfollow" placement="top">
          <PersonAddDisabledIcon fontSize="small" className="button" onClick={() => handleU(info.username)} />
        </Tooltip>
      </div>
      <div className="followerContainer">
        <div className="myimgContainer">
          <img
            className="myimg"
            src={`/api/viewFile/${info.profile_picture}`}
            alt=""
          />
        </div>
      </div>
      <div style={{ fontWeight: 'bold', color: '#0C8367' }} className="text">{info.username}</div>
    </div>
  );
}
