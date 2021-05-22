/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Typography from '@material-ui/core/Typography';
import { getAllCommentsForTweet, getHiders } from './Module';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose,
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DialogAnalytics({ tweetId }) {
  const [hiders, setHiders] = useState([]);
  const [commentors, setCommentors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const getData = async () => {
    await getAllCommentsForTweet(tweetId).then((res) => {
      const { comments } = res.data;
      setCommentors(comments.map((com) => com.user));
    }).catch((err) => console.log(err.message));
    await getHiders(tweetId).then((res) => {
      setHiders(res.data.hiders.map((hider) => hider.user));
    }).catch((err) => console.log(err.message));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {

  }, [hiders, commentors, open]);
  return (
    <div>
      <div>
        <IconButton
          onClick={handleClickOpen}
          style={{
            borderRadius: '50%',
            padding: '3',
          }}
        >
          <AssessmentIcon />
        </IconButton>
        <span id="analytics_btn" style={{ color: '#0C8367' }}>Analytics</span>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Tweet analytics
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ display: 'flex', minWidth: '100px' }}>
            <div>
              <span style={{ margin: 'auto', color: '#0C8367', fontWeight: 'bold' }}>Commentors</span>
              <ol style={{ margin: 'auto', listStyleType: 'circle' }}>
                {commentors.map((e) => (
                  <li>
                    {e}
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ marginLeft: '5px', borderRadius: '8px', backgroundColor: '#D0EAE4' }} className="hiders">
              <div style={{ display: 'flex' }}>
                <span style={{ margin: 'auto', color: '#0C8367', fontWeight: 'bold' }}>Hiders</span>
              </div>

              <ol style={{ margin: 'auto', listStyleType: 'circle' }}>
                {hiders.map((hider) => (
                  <li key={hider}>
                    {hider}
                    {' '}
                  </li>
                ))}
              </ol>
            </div>
          </div>

        </DialogContent>
        <DialogActions />
      </Dialog>
    </div>
  );
}
