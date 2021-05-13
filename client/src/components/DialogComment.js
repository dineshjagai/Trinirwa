import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './CommentDisplayer.css';

export default function DialogComment({ id, content, updatePost }) {
  const cont = content;
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState(255);
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value);
    setCount(255 - e.target.value.length);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosePostChanged = () => {
    updatePost(input);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen} id="editBtn" type="button">Edit</button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Changes will be made once you post them!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={`name${id}`}
            label="Edit post"
            type="email"
            multiline
            fullWidth
            helperText={`${count} remaining chars`}
            defaultValue={cont}
            inputProps={{ maxLength: 255 }}
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'green' }} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button style={{ color: 'green' }} onClick={() => handleClosePostChanged(input)} color="primary">
            Post changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
