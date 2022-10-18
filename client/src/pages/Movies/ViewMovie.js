

import React, { Component, useEffect,useState } from 'react'
import axios from '../../axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Movies.css';
// import DatePicker from "react-bootstrap-date-picker";
// var DatePicker = require("react-bootstrap-date-picker");
import DateTimePicker from 'react-datetime-picker';

const ViewMovie=(props)=>{
    const movieId=props.match.params.movieId;
    const [movie,setMovie]=useState({});
    useEffect(()=>{
      
        console.log(movieId);
        
        const getMovieData=async()=>{
        let MovieData=await axios({
            url:`/movie/${movieId}`,
            method:'get'
        });
         MovieData=MovieData.data.movie;
        console.log(MovieData," Movie Object before time work");

        const MovieObject={
            ...MovieData,
            releaseDate:new Date(MovieData.releaseDate),
            endDate:new Date(MovieData.endDate)
        }

        let movieReleaseDate=MovieObject.releaseDate.toString();
        let movieEndDate=MovieObject.endDate.toString();
        movieReleaseDate=movieReleaseDate.slice(0,25);
        movieEndDate=movieEndDate.slice(0,25);
        
        MovieObject.releaseDate=movieReleaseDate;
        MovieObject.endDate=movieEndDate;
        
        setMovie(MovieObject);

        console.log(MovieObject," Movie Object after time work")


    }
    const fetchUser=async()=>{
      const response= await axios({
          method: 'get',
          url: '/user/profile'
        });
        if(response.data.status==="unauthorized"){
          alert(" User is not authorized");
          window.location.replace('http://localhost:3000/');
        }

        // console.log(response," Response of user");
        // console.log("Data is :",response.data.user.role);
        const User=response.data.user;
        if(User.role!=='admin'){
          alert("Logged In User is not authorized");
          window.location.replace('http://localhost:3000/');
        }
  }




    fetchUser();
    getMovieData();


    },[])

    return(        <div className='container EditMovies-Container' style={{marginTop:'20px'}}>
      <h1>Movie Detail:</h1>
    <div className='row'>
        <div className='col-md-6'>
<Form  >
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Movie Title:</Form.Label>
  <Form.Control type="title" name="title"  value={movie.title} disabled={true}  />
  {/* <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text> */}
</Form.Group> 
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Genre :</Form.Label>
  <Form.Control type="genre"  name="genre" value={movie.genre} disabled={true}  />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>duration :</Form.Label>
  <Form.Control type="Number"  name="duration" value={movie.duration} disabled={true}  />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Cast: </Form.Label>
  <Form.Control type="cast"  name="cast" value={movie.cast} disabled={true}  />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Banner Image: </Form.Label>
  <img src={movie.bannerImage} alt="Banner image" />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Poster Image: </Form.Label>
  <img  src={movie.posterImage}  />
</Form.Group>

<Form.Group className="mb-3" controlId="Form Release Date">
    <Form.Label>Release Date:</Form.Label>
<Form.Control type="cast"  name="release Date" value={movie.releaseDate} disabled={true}  />

</Form.Group>
<Form.Group className="mb-3" controlId="Form Release Date">
    <Form.Label>End Date:</Form.Label>
<Form.Control type="cast"  name="end Date" value={movie.endDate} disabled={true}  />
   
</Form.Group>


    </Form>
</div>
</div>
</div>);
}


export default ViewMovie;
