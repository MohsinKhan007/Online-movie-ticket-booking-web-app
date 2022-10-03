import React, { useContext } from 'react';
import { NavLink,Link } from 'react-router-dom';
import classes from './AccountMenu.module.css';
import axios from '../../axios';
import AuthContext from '../../Store/AuthContext';
import ReservationContext from '../../Store/ReservationContext';

function AccountMenu({ setAccountShow }) {
  const [authStatus, dispatchAuth] = useContext(AuthContext);
  const [reservation, dispatch] = useContext(ReservationContext);

  console.log("authStatus ",authStatus.userId);

  const handleSignOut = () => {
    // Remove JWT token and reset state
    async function userSignOut() {
      try {
        await axios({
          method: 'get',
          url: '/user/signout'
        });
        dispatch({
          type: 'ADD_EMAIL_ID',
          payload: ''
        });
        dispatch({
          type: 'ADD_NAME',
          payload: ''
        });
        dispatchAuth({ type: 'LOGOUT_SUCCESS', payload: false });
        setAccountShow(false);
      } catch {
        dispatchAuth({ type: 'LOGOUT_SUCCESS', payload: true });
      }
    }
    userSignOut();
  };
  return (
    <div className={classes.nav} style={{height:"auto", right:'10px',top:'50px'}}>
      <ul>
        {/* to={`/showtimings/${movie._id}`} */}
        {authStatus.isLoggedIn && <Link to={`/profile/${authStatus.userId}`}>  <li>{`Hi ${reservation.name}`}</li> </Link>}
        {authStatus.isLoggedIn && (
          <li className={classes.sign_out} onClick={handleSignOut}>
            Sign Out
          </li>
        )}
        {!authStatus.isLoggedIn && (
          <li>
            <NavLink to="/signin">Sign In</NavLink>
          </li>
        )}
        {!authStatus.isLoggedIn && (
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default AccountMenu;
