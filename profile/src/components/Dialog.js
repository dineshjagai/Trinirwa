import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function DialogBox(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
  const addUrl = '/profile/interest/'+props.id;
  let input = document.getElementById('interest').value;
  input = input+"";
    axios({
        method: 'POST',
        url: addUrl,
        data: {
            interest: input,
        }
    });
  
    setOpen(false);
    
  };

  return (
    <div>
      <Button  color="primary" onClick={handleClickOpen}>
        Add interest
      </Button>
      <Dialog open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add interest</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="interest"
            type="string"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
