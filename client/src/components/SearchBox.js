import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import React, { useEffect, useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import { searchFriend, followUser, getFollowers } from './Module';
import { getCurrentUsername } from '../auth/authServices';

const useStyles = makeStyles((theme) => ({
  root: {
    left: '25px',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '100%',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    eight: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '30%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export default function SearchBox() {
  const user = getCurrentUsername();
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [results, setResults] = useState([]);
  // handling following
  const handleF = (username) => {
    followUser(user, username).then((res) => {
      console.log(res.message);
      getFollowers(user).then((result) => {
        console.log(result.data.followers);
      });
    });
  };

  const createItem = (data) => {
    console.log(data.profile_picture);
    const toRet = (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt=""
            src={`/viewFile/${data.profile_picture}`}
          />
        </ListItemAvatar>
        <ListItemText primary={data.username} secondary="hey" />
        <Tooltip title="follow" placement="top">
          <PersonAddIcon className="button" style={{ color: '#0C8367' }} onClick={() => handleF(data.username)} />
        </Tooltip>
      </ListItem>
    );
    return toRet;
  };
  const handleChange = (e) => {
    searchFriend(user, e.target.value).then((result) => {
      console.log(`input: ${e.target.value} , ${user}`);
      setResults(result.data.friends);
      console.log(results.data.friens);
    }).catch((error) => {
      console.log(error.message);
    });
  };
  useEffect(() => {
    console.log(results);
    const newItems = results.map((u) => createItem(u));
    console.log(items);
    setItems(newItems);
    if (results.length === 0) {
      setItems([]);
    }
  }, [results]);

  return (
    <div style={{ margin: 'auto' }}>
      <div>
        <div className={classes.search}>
          <div className={classes.searchIcon} />
          <div>
            <InputBase
              id="search"
              placeholder="Search user…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
      <List className={classes.root}>
        {items}
      </List>
    </div>
  );
}
