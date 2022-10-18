import React, { useEffect, useContext, useState } from 'react';

import axios from '../../axios';
import ReservationContext from '../../Store/ReservationContext';
import ScreenSelector from '../../components/ScreenSelector';
import BookingCalendar from '../../components/BookingCalendar';
import classes from './ShowTimings.module.css';
import Cinemas from '../../components/Cinemas';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';
import { setLocalStorage } from '../../utils/localStorage';
import truncate from '../../utils/truncate';
// now pass cinemas data in this and 
function ShowTimings(props) {
  const [reservation] = useContext(ReservationContext);
  const [cinemas, setCinemas] = useState(props.cinemas?props.cinemas:[]);
  const [selectScreen, setSelectScreen] = useState('All Screens');
  const [showModal, setShowModal] = useState({
    status: false,
    type: '',
    subject: '',
    message: ''
  });
  const [movie, setMovie] = useState(props.movie?props.movie:{});

  // const { movieId } = props.match.params;
  const movieId=props.match? props.match.params.movieId:(props.movieId);
  
  // console.log(movieId," Movie Id");



if(!props.match){


  reservation.emailId="mohsinkhan0104@gmail.com",
  reservation.movie="The Gray Man",
  reservation.movieId="632d478b24abee245821ee09",
  reservation.movieImg="https://i.ibb.co/9493V21/1232204.jpg",
  reservation.name="https://i.ibb.co/9493V21/1232204.jpg"
};



  useEffect(() => {
    setLocalStorage('reservation', reservation);

    async function fetchMovie() {
      try {
        const response = await axios.get(`/movie/${movieId}`);
        setMovie(response.data.movie);
      } catch {
        setShowModal({
          status: true,
          type: 'close',
          subject: 'Error',
          message: 'something_wrong'
        });
      }
    }
    if(!movie || Object.keys(movie).length===0 ){
    fetchMovie();
  }
  }, []);

  // Fetch Show timing based on user's date selection
  useEffect(() => {
    async function fetchData() {
      try {

        // console.log("check",await axios.get(`/show-timing/${movieId}`, {
        //   params: {
        //     selectedDate: reservation.date.format('YYYY-MM-DD')
        //   }
        // }));

        const response = await axios.get(`/show-timing/${movieId}`, {
          params: {
            selectedDate: reservation.date.format('YYYY-MM-DD')
          }
        });

      

        // Error modal if there are no shows available
        if (response.data.showTimings.length === 0) {
          setShowModal({
            status: true,
            type: 'close',
            subject: 'Info',
            message: 'no_shows'
          });
        }

        response.data.showTimings.forEach((show) => {
          setCinemas((prevCinemas) => [
            ...prevCinemas,
            {
              showId: show.screenId + show.startAt,
              screenId: show.screenId,
              name: show.screen_details[0].name,
              startAt: show.startAt,
              ticketPrice: show.screen_details[0].ticketPrice,
              city: show.screen_details[0].city,
              image: show.screen_details[0].image,
              seats: show.screen_details[0].seats,
              showTimeId: show._id
            }
          ]);
        });
      } catch {
        setShowModal({
          status: true,
          type: 'close',
          subject: 'Error',
          message: 'something_wrong'
        });
      }
    }
    fetchData();
    return () => setCinemas([]);
  }, [reservation.date]);

  return (
    <div className={classes.container}>
      <div
        className={classes.banner}
        style={{
          backgroundSize: 'contain',
          backgroundImage: `url(
        ${reservation.movieImg}
        )`,
          backgroundPosition: 'center cover'
        }}>
        {movie && (
          <div className={classes.banner_contents}>
            <h1 data-testid="name" className={classes.banner_title}>{reservation.movie}</h1>
            <div className={classes.movie_info}>
              <h1 className={classes.movie_description}>
                {movie.description && truncate(movie.description.en, 150)}
              </h1>
              {/* <h1 className="movie_desc_text">{`Director: ${movie.director}`}</h1> */}
              {/* <h1 data-testid="director" style={{fontSize:'1.5rem'}} className="movie_desc_text">{`Director: ${movie.director}`}</h1> */}
              <h1 data-testid="genre" style={{fontSize:'1.5rem'}} className="movie_desc_text">Genre {movie.genre}</h1>
              <h1 data-testid="cast" style={{fontSize:'1.5rem',width:'176%'}} className="movie_desc_text">{`Cast: ${movie.cast}`}</h1>
              <h1 data-testid="originalLanguage" style={{fontSize:'1.5rem'}} className="movie_desc_text">{`Language: ${movie.originalLanguage}`}</h1>
              <h1 data-testid="duration" style={{fontSize:'1.5rem'}} className="movie_desc_text">{`Duration: ${movie.duration}`}</h1>
            </div>
          </div>
        )}
        <div className={classes.banner_fadeBottom} />
      </div>
      <div className={classes.selectors}>
        <BookingCalendar />
        <ScreenSelector cinemas={cinemas} setSelectScreen={setSelectScreen} />
      </div>
      <Cinemas cinemas={cinemas} selectScreen={selectScreen} />
      <Footer />
      {showModal.status && (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default ShowTimings;
