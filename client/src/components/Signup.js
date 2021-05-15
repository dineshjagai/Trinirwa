import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  addProfilePicture, addInterest, deleteInterest, getProfileData,
} from './Module';
import '../App.css';
import Displayer from './Displayer';
import { getCurrentUsername } from '../auth/authServices';

export default function Signup() {
  const history = useHistory();
  const username = getCurrentUsername();
  console.log(`username = ${username}`);

  /* -------------------------------------------------------------------------- */
  const [interests, setInterests] = useState(new Set());
  // const [madeQuery, setMadeQuery] = useState(false);
  const [childKey, setChildKey] = useState(0);
  const [filePath, setFilePath] = useState('');
  // const [showImage] = useState(<div />);

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

    fetch('/api/uploadFile', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setFilePath(JSON.parse(result).data);
        addProfilePicture(username, JSON.parse(result).data)
          .then((res) => {
            console.log(res);
          }).catch((error) => {
            console.log(error);
          });
      }).catch((err) => {
        alert(err);
      });
  };

  // useEffect(() => {
  //   if (typeof filePath !== 'undefined') {
  //     const tmp = `/viewFile/${filePath}`;
  //     console.log(`${tmp}`);
  //   }
  // }, [filePath]);

  const signup = () => {
    alert('Your have successfully signed up');
    history.push('/login/');
  };
  // useEffect(() => {

  // }, [filePath]);
  let showImage = <div />;
  if (filePath !== '') {
    showImage = (
      <div className="myimgContainer">
        {' '}
        {' '}
        Here is your new profile
        <img
          className="myimg"
          src={`/api/viewFile/${filePath}`}
          alt=""
        />
      </div>
    );
    console.log(`/api/viewFile/${filePath}`);
  }
  console.log(showImage);
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

            <label htmlFor="new-username-form">Please Upload Profile Picture:</label>
            <input
              type="file"
              className="form-control"
              id="fileUploadProfilePicture"
              onChange={fileupload}
            />
            {showImage}

            <label htmlFor="new-username-form">Please Add Your Interests:</label>

            <Displayer
              key={childKey}
              interests={interests}
              addInterest={handleAddInterest}
              deleteInterest={handleDeleteInterest}
            />
            <div className="form-group">
              <button
                type="submit"
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
