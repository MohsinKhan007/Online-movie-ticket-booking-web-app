import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Form.module.css';
import FormSignup from '../../components/SignUp';
import FormSignin from '../../components/SignIn';

const Form = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
         <div className={classes.form_control_m}>
        <div className="container py-5">
          <NavLink to="/" className={classes.closeLink}>
            <span className={classes.close_btn}>×</span>
          </NavLink>
          <div className="row ">
            <div className="col-lg-5">
              <div className={classes.form_content_left}>
                <img
                  // className={classes.form_img}
                  className="img-fluid"
                  src="https://images.pexels.com/photos/1769413/pexels-photo-1769413.jpeg?cs=srgb&dl=pexels-alex-powell-1769413.jpg&fm=jpg"
                  alt="spaceship"
                />
              </div>
            </div>
            <div className="col-lg-7 ">
              <div className={classes.form_content_parent}>
                {props.match.path === "/signup" ? (
                  <FormSignup
                    submitForm={submitForm}
                    isSubmitted={isSubmitted}
                  />
                ) : (
                  <FormSignin isSubmitted={isSubmitted} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
