import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';
import { deactivateProfile } from './Module';
import './DialogPassword.css';

export default function DialogPassword({ id }) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [clue, setClue] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClue('');
  };

  const handleCloseDelete = () => {
    const input = document.getElementById('passwordInput').value;
    if (input !== '') {
      deactivateProfile(id, input).then((response) => {
        console.log(response);
        setOpen(false);
        setRedirect(true);
      }).catch((err) => {
        console.log(err);
        setClue('Incorrect entry');
      });
    }
  };

  return !redirect ? (
    <div>
      <button id="delete" style={{ color: '#00695c', border: 'none', backgroundColor: 'inherit' }} type="button" onClick={handleClickOpen}>Delete account</button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm account deletion</DialogTitle>
        <DialogContent>
          <TextField
            error={clue !== ''}
            autoFocus
            margin="dense"
            id="passwordInput"
            label="Input password"
            type="password"
            fullWidth
            helperText={clue}
          />
        </DialogContent>
        <DialogActions>
          <button className="btn cancel" type="button" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn delete" type="button" onClick={handleCloseDelete}>
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  ) : <Redirect to="/login" />;
}
