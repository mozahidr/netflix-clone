import React, { useEffect } from 'react';
import './ProfileScreen.css';
import { Nav } from '../Navbar/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import avatar2 from '../images/avatar2.png';
import { auth } from '../firebase';
import { PlanScreen } from './PlanScreen';

export const ProfileScreen = () => {
  const user = useSelector(selectUser);

  return (
    <div className='profileScreen'>
        <Nav />
        <div className='profileScreen__body'>
          <h1>Edit Profile</h1>
          <div className='profileScreen__info'>
            <img src={avatar2} alt="avatar2" />
            <div className="profileScreen__details">
              <h2>{user.email}</h2>
              <div className='profileScreen__plans'>
                <h3>Plans</h3>
                <PlanScreen />
                <button onClick={() => auth.signOut()} className='profileScreen__signOut'>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
