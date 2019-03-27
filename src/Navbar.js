import React from 'react'
import { withRouter } from 'react-router-dom';
import './css/navbar.scss'
import UserMenu from './UserMenu'
import AdminMenu from './AdminMenu'

const Navbar = props => {
  //Were keeping track of state so that we can render the appropriate navbar based on the user
    if (props.location.pathname.includes('/user/') || props.location.pathname.includes('/admin/')) {
      return props.location.pathname.includes('/user/')
        ? (
          <div className="Navbar">
            <UserMenu />
          </div>
        ) : (
          <div className="Navbar">
            <AdminMenu />
          </div>
        );
    } else {
      return null;
    }
}

export default withRouter(Navbar);
