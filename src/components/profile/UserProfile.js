import {React, useEffect, useState} from 'react'
import './UserProfile.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';
import RoutesContainer from './routes/RoutesContainer';
import { Button } from 'react-bootstrap';

function UserProfile() {

  return (
    <div className='tripsContainer'>
      <RoutesContainer/>
    </div>
  )
}

export default UserProfile