
import React, { useEffect,useState } from 'react'
import axios from '../../axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import DatePicker from "react-bootstrap-date-picker";
// var DatePicker = require("react-bootstrap-date-picker");
import DateTimePicker from 'react-datetime-picker';
import './Movies.css';

function CreateMovie(){

    const [movie,setMovie]=useState({
        title:'',
        posterImage:'',
        bannerImage:'',
        genre:'',
        duration:0,
        cast:'',
        description:{
            en:''
        },
        originalLanguage:'',
        releaseDate:new Date(),
        endDate:new Date()
    });
    const releaseDate='releaseDate';
    const endDate='endDate';
   
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

    fetchUser();

    },[])

    const handleChange=(e)=>{
        const {name,value}=e.target;    
        if(name==='description'){  
            setMovie((prevState)=>({...prevState,description:{en:value}}));
        }
        else{
            setMovie((prevState)=>({...prevState,[name]:value}));
        }
    }
    const handleTimeChange=(e,date)=>{
     
        const name=date;
        setMovie((prevState)=>({...prevState,[name]:e}))
    }

    const handleSubmit=async(e)=>{
      try{
        e.preventDefault();
        const response=await axios({
            method:'post',
            url:`movie/`,
            data:movie
        });

        if(response.data.status=='success'){
            alert("Movie Data is Changed SucessFully");
            window.location.replace('http://localhost:3000/movies');
            // add window redirect to listing page
        }
        else{

            alert("An Error occured is Changed");
            window.location.replace('http://localhost:3000/movies');
        }
      
        }catch(e){
            console.log(e.errors);
        }
    }

    return(    
        <div className='container EditMovies-Container' style={{marginTop:'20px'}}>
           <h1>Add Movie Details:</h1>
            <div className='row'>
                <div className='col-md-6'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Movie Title:</Form.Label>
                            <Form.Control type="title" name="title" onChange={handleChange} value={movie.title}  />

        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Genre :</Form.Label>
          <Form.Control type="genre" onChange={handleChange} name="genre" value={movie.genre}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description :</Form.Label>
          <Form.Control type="genre" onChange={handleChange} name="description" value={movie.description.en}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>duration :</Form.Label>
          <Form.Control type="Number" onChange={handleChange} name="duration" value={movie.duration}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cast: </Form.Label>
          <Form.Control type="text" onChange={handleChange} name="cast" value={movie.cast}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Form Original Language">
          <Form.Label>Original Language:</Form.Label>
          <Form.Control type="cast" onChange={handleChange} name="originalLanguage" value={movie.originalLanguage}  />
          
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
          Add Movie
        </Button>
      </Form>
      </div>
      </div>
      </div>);


}


export default CreateMovie;