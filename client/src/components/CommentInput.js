import React, { useState } from 'react';
import './CommentInput.css';
import TextField from '@material-ui/core/TextField';

export default function CommentInput({ id, handleComment }) {
  const [input, setInput] = useState('');
  const [count, setCount] = useState(255);
  const handleChange = (e) => {
    if ((e.target.value).length >= 0) {
      const u = 255 - (e.target.value).length;
      setCount(u);
      setInput(e.target.value);
      console.log(input);
    }
  };
  return (
    <div className="comment_box">
      <div className="commentInpCtn">
        <TextField
          id={`${id}`}
          label="Comment on post"
          multiline
          rowsMax={4}
          helperText={`${count} remaining chars`}
          variant="outlined"
          inputProps={{ maxLength: 255 }}
          onChange={(e) => handleChange(e)}
          fullWidth
        />
      </div>
      <div className="commentBtnCtn">
        <button onClick={() => handleComment(input)} id="commentButton" type="button"> Comment</button>
      </div>
    </div>
  );
}
