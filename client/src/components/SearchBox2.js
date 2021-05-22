import { TextField } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Tooltip from '@material-ui/core/Tooltip';

import React, { useEffect, useState } from 'react';
import {
  searchFriend, followUser,
  getFollowers, blockFollower, getBlockedFollowers, unfollowUser,
} from './Module';
import { getCurrentUsername } from '../auth/authServices';
import './SearchBox.css';

export default function searchBox() {
  const user = getCurrentUsername();
  const [results, setResults] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [blockedUsers, setBlockedUser] = useState(new Set());

  const handleFollow = (username) => {
    followUser(user, username).then((res) => {
      console.log(res.message);
      getFollowers(user).then((result) => {
        console.log(result.data.followers);
      });
    });
  };
    // handling blocking
  const handleBlock = (username) => {
    blockFollower(user, username).then((res) => {
      console.log(res.message);
    }).catch((err) => console.log(err.message));
  };
  const getData = () => {
    getBlockedFollowers(user).then((res) => {
      setBlockedUser(() => new Set([res.data.friends.map((e) => e.username)]));
    }).catch((err) => console.log(err.message));
  };
    //  handling unfollowing
  const handleUnfollowing = (username) => {
    unfollowUser(user, username).then((res) => {
      console.log(res.message);
    }).catch((err) => console.log(err.message));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    if (e.target.value === '') {
      setResults([]);
      return;
    }
    searchFriend(user, e.target.value).then((result) => {
      console.log(`input: ${e.target.value} , ${user}`);
      setResults(result.data.friends);
      console.log(result.data.friends);
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const searchItem = (info) => {
    const status = info.followed;
    const isUser = info.username === user;
    const blocked = blockedUsers.has(info.username);
    return (
      <div className="searchItem">
        <div className="searchImg">
          <img id="search_img" src={`/api/viewFile/${info.profile_picture}`} alt="" />
        </div>
        <div className="search-name">
          <span style={{ color: '#0C8367', fontWeight: 'bold' }}>
            {info.username}
          </span>
          <span style={{ fontWeight: 'lighter' }}>
            {info.followed ? 'following' : 'Follow me PLZ :)'}
          </span>
        </div>
        <div className="searchBtn">
          <>
            {(!status && !isUser) && (
              <Tooltip title="Follow" placement="top">
                <PersonAddIcon style={{ margin: '2px' }} fontSize="small" className="button" onClick={() => handleFollow(info.username)} />
              </Tooltip>
            )}
            {(blocked && !isUser) && (
              <Tooltip title="Unblock" placement="top">
                <LockOpenIcon className="button" style={{ margin: '2px' }} fontSize="small" />
              </Tooltip>
            )}

            {(status && !isUser) && (
              <Tooltip title="Unfollow" placement="top">
                <PersonAddDisabledIcon style={{ margin: '2px' }} fontSize="small" className="button" onClick={() => handleUnfollowing(info.username)} />
              </Tooltip>
            )}

            {!isUser && (
            <Tooltip title="Block" placement="top">
              <BlockIcon style={{ margin: '2px' }} fontSize="small" className="button" color="secondary" onClick={() => handleBlock(info.username)} />
            </Tooltip>
            )}

          </>
        </div>
      </div>
    );
  };
  return (
    <div>
      <TextField
        multiline
        id="tweet"
        label="Search for contact"
        variant="outlined"
        inputProps={{ maxLength: 255 }}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <div className="searchBack">
        {results.map((e) => (searchItem(e)))}
      </div>
    </div>
  );
}
