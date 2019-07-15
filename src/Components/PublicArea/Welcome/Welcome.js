import React from 'react';
import logo from '../../../logo.svg';
import './Welcome.css';
import UserOverview from './UserOverview/UserOverview'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {admin} from '../../../Routing/Routes'

function Welcome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserOverview></UserOverview>
        <Link to={admin}>
          <Button inverted color='blue'>go to admin view</Button>
        </Link>
      </header>
    </div>
  );
}

export default Welcome;
