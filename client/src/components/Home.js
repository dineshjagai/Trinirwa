import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import NavBar from './navBar';
// import SideBar from './Sidebar';
// import CommentBox from './CommentBox';
import idContext from './Context';
import Displayer from './CenterDisplay';

export default function Home({ uid }) {
  const [id, setId] = useState('');
  console.log(`uid home page${uid}`);
  useEffect(() => {
    setId(id);
  }, [id]);
  const user = useContext(idContext);
  console.log(user);
  return (
    <div className="home">
      <NavBar />
      <div
        style={{
        }}
      >
        <Displayer />
      </div>
    </div>
  );
}
