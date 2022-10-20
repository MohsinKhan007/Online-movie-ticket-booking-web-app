
import React, { useEffect,useState } from 'react'
import axios from '../../axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import DatePicker from "react-bootstrap-date-picker";
// var DatePicker = require("react-bootstrap-date-picker");
import DateTimePicker from 'react-datetime-picker';
import './Movies.css';

function EditMovie(props){

    const [movie,setMovie]=useState({});
    const releaseDate='releaseDate';
    const endDate='endDate';
    const movieId=props.match.params.movieId;
    useEffect(()=>{
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

    
        console.log( props.match.params.movieId);
      

        const fetchMovie=async()=>{
          // try{
            const response=await axios({
                method:`get`,
                url:`/movie/${movieId}`,
                
            });

            console.log(response.data.movie);
            console.log(response.data)
            const MovieObject={
                ...response.data.movie,
                releaseDate:new Date(response.data.movie.releaseDate),
                endDate:new Date(response.data.movie.endDate)
            }
           
            setMovie(MovieObject)

        }
        try{
          fetchUser();
        fetchMovie();
        }catch(e){
          console.log(e);
        }
    },[])

    const handleChange=(e)=>{
       const {name,value}=e.target;      
      setMovie((prevState)=>({...prevState,[name]:value}));
      }
  const handleTimeChange=(e,date)=>{
     
    const name=date;
     setMovie((prevState)=>({...prevState,[name]:e}))
    }

    const handleSubmit=async(e)=>{
      try{
      e.preventDefault();

     
      console.log(movie.releaseDate.getTime()," Release Date");
      console.log(movie.endDate.getTime()," EndDate");

      if(movie.releaseDate.getTime()>=movie.endDate.getTime()){
        alert("Movie Release cannot be after the end Date");
        return 0;
      }

       


      const response=await axios({
        method:'patch',
        url:`movie/${movieId}`,
        data:movie
      });

      if(response.data.status=='success'){
        alert("Movie Data is Changed SucessFully");
        window.location.replace('http://localhost:3000/movies');
      }
      else{
        alert("An Error occured is Changed");
        window.location.replace('http://localhost:3000/movies');
      }
      // console.log();

    }catch(e){

      console.log(e);
    }


      // const SubmitMovie={
      //   ...movie,
      //   releaseDate:(releaseDate),
      //   endDate:new Date(endDate)
      // }
      // console.log("Submit Movie ",SubmitMovie);


        // console.log("Handle Submit");
        // console.log(movie," Movie Data ");
    }

    return(    
        <div className='container EditMovies-Container' style={{marginTop:'20px'}}>
          <h1>Edit Movie :</h1>
            <div className='row'>
                <div className='col-md-6'>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Movie Title:</Form.Label>
          <Form.Control type="title" name="title" onChange={handleChange} value={movie.title}  />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Genre :</Form.Label>
          <Form.Control type="genre" onChange={handleChange} name="genre" value={movie.genre}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>duration :</Form.Label>
          <Form.Control type="Number" onChange={handleChange} name="duration" value={movie.duration}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cast: </Form.Label>
          <Form.Control type="cast" onChange={handleChange} name="cast" value={movie.cast}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Poster Image: </Form.Label>
          <Form.Control type="text" onChange={handleChange} name="posterImage" value={movie.posterImage}  />
        </Form.Group>
              <Form.Text className="text-muted">
            Kindly only share the workring  poster url of the Movie
          </Form.Text>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Banner Image: </Form.Label>
          <Form.Control type="text" onChange={handleChange} name="bannerImage" value={movie.bannerImage}  />
        </Form.Group>
        <Form.Text className="text-muted">
            Kindly only share the workring banner url of the Movie
          </Form.Text>



        <Form.Group className="mb-3" controlId="Form Release Date">
          <Form.Label>Release Date:</Form.Label>
          <DateTimePicker name="releaseDate" onChange={(event)=>handleTimeChange(event,releaseDate)}  value={movie.releaseDate} />
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="Form Release Date">
          <Form.Label>End Date:</Form.Label>
          <DateTimePicker name="endDate" onChange={(event)=>handleTimeChange(event,endDate)} value={movie.endDate} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      </div>
      </div>
      </div>);


}


export default EditMovie;