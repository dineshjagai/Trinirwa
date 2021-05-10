import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import idContext from './Context';
import { getFriends } from './Module';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollDialog({ button }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [items, setItems] = useState([]);
  const user = useContext(idContext);
  const createItem = (data) => {
    console.log(data.profile_picture);
    const toRet = (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt=""
            src={data.profile_picture}
          />
        </ListItemAvatar>
        <ListItemText primary={data.username} secondary="hey" />
      </ListItem>
    );
    return toRet;
  };
  const handleClickOpen = (scrollType) => () => {
    console.log('here');
    getFriends(user).then((response) => {
      const newItems = response.data.friends.map((e) => createItem(e));
      console.log(response.data.friends);
      setItems(newItems);
    }).catch((error) => {
      console.log(error.message);
    });
    setOpen(true);
    setScroll(scrollType);
  };

  useEffect(() => {
  }, [items]);
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <button
        onClick={handleClickOpen('paper')}
        className="btn"
        id="delete"
        style={{
          color: '#00695c',
          border: 'none',
          backgroundColor: 'inherit',
        }}
        type="button"
      >
        All friends
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">All friends</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <List className={classes.root}>
            {items}
          </List>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="btn"
            id="delete"
            style={{
              color: '#00695c',
              border: 'none',
              backgroundColor: 'inherit',
            }}
            type="button"
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
