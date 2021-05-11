import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  addProfilePicture, addInterest, deleteInterest, getProfileData,
} from './Module';
import '../App.css';
import Displayer from './Displayer';

export default function Signup() {
  const history = useHistory();
  const { username } = useParams();
  console.log(`username = ${username}`);

  /* -------------------------------------------------------------------------- */
  const [interests, setInterests] = useState(new Set());
  // const [madeQuery, setMadeQuery] = useState(false);
  const [childKey, setChildKey] = useState(0);

  useEffect(() => {
    getProfileData(username).then((result) => {
      console.log(result.data.data[0]);
      const newInterest = new Set((result.data.interests).map((obj) => obj.interest));
      setInterests(newInterest);
    }).catch((error) => {
      console.log(error.message);
    });
  }, []);

  const handleAddInterest = (newInterest) => {
    setInterests([...interests, newInterest]);
    setChildKey(Math.floor(Math.random() * 1000000000));
    addInterest(newInterest, username);
  };

  const handleDeleteInterest = (interest) => {
    const temp = interests;
    temp.delete(interest);
    setInterests(temp);
    setChildKey(Math.floor(Math.random() * 1000000000));
    deleteInterest(interest, username);
  };
  /* -------------------------------------------------------------------------- */

  const fileupload = (e) => {
    const formdata = new FormData();
    // console.log(e.target.files);
    const fakePath = document.getElementById('fileUploadProfilePicture').value;
    formdata.append('image', e.target.files[0], fakePath);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('/uploadFile', requestOptions)
      .then((response) => response.text())
      .then((result) => addProfilePicture(username, JSON.parse(result).data)
        .then((res) => {
          console.log(res);
        }).catch((error) => {
          console.log(error);
        })).catch((err) => {
        alert(err);
      });
  };

  const signup = () => {
    alert('Your have successfully signed up');
    history.push('/login/');
  };

  return (
    <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
      <div className="container mx-1">
        <div className="card-body p-xs">
          <h2 className="card-title text-center font-weight-bold">

            Hi
            <var>
              {' '}
              {username}
            </var>

          </h2>
          <h2 className="card-title text-center font-weight-bold">
            {' '}
            <h2 className="card-title text-center font-weight-bold">Please Finish Sign Up</h2>
          </h2>
          <div className="form-group">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <img src="/uploadFiles/1620555316674--image.png" alt="" className="img-responsive" />
            </div>

            <label htmlFor="new-username-form">Please Upload Profile Picture:</label>
            <input
              type="file"
              className="form-control"
              id="fileUploadProfilePicture"
              placeholder="Enter email"
              onChange={fileupload}
            />

            <label htmlFor="new-username-form">Please Add Your Interests:</label>

            <Displayer
              key={childKey}
              interests={interests}
              addInterest={handleAddInterest}
              deleteInterest={handleDeleteInterest}
            />
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={signup}
              >
                Complete Registration
              </button>
            </div>
            <p>
              Already have an account?&nbsp;
              <Link to="/login">Log in here!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
