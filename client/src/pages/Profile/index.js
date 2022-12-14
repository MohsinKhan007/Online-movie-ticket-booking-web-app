import React, { useEffect,useState } from 'react';

import axios from '../../axios';
import Navbar from '../../components/NavBar';
import "./profile.css";
function Profile({user}) {

    const [userData,setUserData]=useState(user?user:{});
    
    // console.log(userData," User Data", user);

    // console.log
    useEffect(()=>{
      
        const fetchUser= async()=>{

            const data= await axios({
                method: 'get',
                url: '/user/profile'
              });
              console.log("ider ");
              const userCheck=data.data.user;
              console.log("USer ",user);
              console.log("Ide ayay");
              setUserData({
                name:userCheck.name,
                emailId:userCheck.emailId,
                role:userCheck.role
              })
        }
  
      if(!userData || Object.keys(userData).length===0 ){
        fetchUser();
      }
    },[])

    return (
      <>
      <Navbar/>
        <div className='row' style={{marginTop:'8%'}}>
            <div className='col-md-3'></div>
            <div className='col-md-6'>    
        <div className="form_content_right">
        <form
          id="profileData"
        
          // className={classes.form}
          className="sign_in_m"
          noValidate
        >
          <h1>Your Profile</h1>
          <div className="form_inputs">
            <label className="form_label">Name</label>
            <input
              //get testing id
              data-testid={`name`}
              className="form_input"
              type="text"
              name="name"
              style={{color:'white'}}
              value={user?user.name:userData.name}
              disabled  
            />
            {/* {errors.name && <p>{errors.name}</p>} */}
          </div>

        
          <div className="form_inputs">
            <label className="form_label">Email </label>
            <input
              //get testing id  
              data-testid={`emailId`}
              className="form_input"
              style={{color:'white'}}
              type="email"
              name="emailId"
             
              value={user?user.emailId:userData.emailId}
              
              disabled         
            />
            {/* {errors.emailId && <p>{errors.emailId}</p>} */}
          </div>
          <div className="form_inputs">
            <label className="form_label">Logged in As:</label>
            <input
              data-testid={`role`}
              className="form_input"
              style={{color:'white'}}
              type="text"
              name="role"
             
              value={user?user.role:userData.role}
              
              disabled         
            />
            {/* {errors.emailId && <p>{errors.emailId}</p>} */}
          </div>
          {/* <div className='' style={{color:'white'}}>
            {userData.role}
          </div> */}
          {/* <div className="form_inputs">
            <label className="form_label">Password</label>
            <input
              className="form_input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={userData.password}
          
            />
            {/* {errors.password && <p>{errors.password}</p>} */}
          {/* </div> */} 
          {/* <div className="form_inputs">
            <label className="form_label">Confirm Password</label>
            <input
              className="form_input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={userData.confirmPassword}
         
            /> */}
            {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
          {/* </div> */}


        </form>
      </div>
</div>
      </div>
      </>
    );
}

export default Profile;