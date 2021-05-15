import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import './Follower.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      borderRadius: '100%',
      padding: 0,
      overflow: 'none',
    },
  },
}));

export default function Follower({ info, handleB, handleF }) {
  const classes = useStyles();
  return (
    <div className="Container_two">
      <div className={classes.root}>
        <Tooltip title="Block user" placement="top">
          <BlockIcon fontSize="small" className="button" color="secondary" onClick={() => handleB(info.username)} />
        </Tooltip>
        <Tooltip title="Follow" placement="top">
          <PersonAddIcon fontSize="small" className="button" onClick={() => handleF(info.username)} />
        </Tooltip>
      </div>
      <div className="followerContainer">
        <div className="myimgContainer">
          <img
            className="myimg"
            src={`/viewFile/${info.profile_picture}`}
            alt=""
          />
        </div>
      </div>
      <div style={{ fontWeight: 'bold', color: '#0C8367' }} className="text">{info.username}</div>
    </div>
  );
}
