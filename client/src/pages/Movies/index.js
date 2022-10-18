import React, { useEffect,useState,useContext } from 'react'


import ReservationContext from '../../Store/ReservationContext';
import AuthContext from '../../Store/AuthContext';
require('dotenv').config();
import axios from '../../axios';
import {Redirect,Route} from 'react-router-dom';
import './Movies.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';


function MoviesPage(){
 
    const [movies,setMovies]=useState([]);

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

        const fetchMovies=async()=>{
            const response=await axios({
                method:'put',
                url:'/movie/getAllMovies'
            });

            // console.log("response ",response);
            const allData=response.data.movie;
 
            // console.log(...allData," All data");

            setMovies(allData);

            //  console.log("Movies");
            //  console.log(allData," all Data");
            //  console.log("Check that");
            //  console.log("Movies ",movies);


            }
        
        console.log("Fetch Users function");
        fetchUser();
        console.log("Fetch Movies function");
        fetchMovies();

    },[]);

    const handleDelete=async(e)=>{
      console.log(e.target.value );

      const MovieId=e.target.value;

    const response=await axios({
      method:'delete',
      url:`/movie/${MovieId}`
    });

    // console.log(response);

    if(response.data.message=='Deleted sucessfully'){

      setMovies((prevState) => {
        // let value = [...prevState];
        // value.splice(MovieId, -1);
        // return value;
        let value=[...prevState];
        return value.filter(value=>value._id!==MovieId)
      });

      alert("Movie Deleted sucessfully")

    }

    }

    
    const moviesList=movies ? movies.map(movie=>{

        return(
        <Card style={{width:'20rem',margin:'10px'}}>
          {/* Link to View  */}
          <Link className="Card-Link-Body" to={`view-movie/${movie._id}`}>
          <Card.Img variant="top" className="CardImage bg-image"  style={{backgroundImage:movie.bannerImage,height:'130px'}}  src={movie.bannerImage} />
          <Card.Body style={{height:'130px'}}>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              {movie.description.en}
            </Card.Text>
          </Card.Body>
          </Link>
          {/* Link to View  */}
        <ListGroup className="list-group-flush">
        {/* <ListGroup.Item>Cras justo odio</ListGroup.Item> */}
        
      </ListGroup>

      <Card.Body className='Card-Body-Flex'>
      {/* <a href="/signup"> */}
      <Link to={`edit-movie/${movie._id}`}>
                      <button
                        className="btn btn-primary"
                        type="button"
                        >
                        Update Movie
                      </button>
                    </Link>
        <button className="btn btn-danger" value={movie._id} onClick={handleDelete}>Delete Movie</button>
   
      </Card.Body>
        </Card>)

    }) : <>Loading</>

    
    return(
      <>
      <NavBar color="white"/>
      <h1 style={{color:'white',marginTop:'80px',textAlign:'center'}}>Movies Page</h1>
     <Link to={`create-movie`} > <button style={{position:'absolute',right:'15px'}} className='btn btn-primary'>Add  Movie</button> </Link>
    <div className='Movie-page container-fluid'>
      <div className="row">
          {moviesList}
      </div>
    </div>
    </>
    
    )



}


export default MoviesPage;