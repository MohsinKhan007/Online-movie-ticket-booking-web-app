import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classes from './Cinemas.module.css';
import ReservationContext from '../../Store/ReservationContext';
import { uuid } from 'uuidv4';

function Cinemas({ cinemas, selectScreen ,testing}) {

  // console.log("Idr Aya hai");
  // console.log(cinemas," cinemas");


  const [, dispatch] = useContext(ReservationContext);  

  

  let newCinemas = [...cinemas];

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    return (
      [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join('/') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
 

  // Filter cinemas based on user cinema selection
  if (
    selectScreen !== 'All Screens'
   
  ) {
    newCinemas = cinemas.filter((cinema) => {
      return selectScreen === cinema.name;
    });
  } else {
    newCinemas = [...cinemas];
  }

  const handleBookNow = (cinema) => {
    dispatch({ type: 'ADD_START_AT', payload: cinema.startAt });
    dispatch({ type: 'ADD_TICKET_PRICE', payload: cinema.ticketPrice });
    dispatch({ type: 'ADD_SEAT_LAYOUT', payload: cinema.seats });
    dispatch({ type: 'ADD_CINEMA_ID', payload: cinema.screenId });
    dispatch({ type: 'ADD_SHOWTIME_ID', payload: cinema.showTimeId });
    dispatch({ type: 'ADD_SELECTED_CINEMA', payload: cinema.name });
  };

  // console.log("type of ",formatDate(new Date(cinemas[0].startAt)).toString());

  return (
    <div className={classes.row} key={uuid()}>
      <div className={classes.row_posters} key={uuid()}>
        {newCinemas.map((cinema) => {
          return (
            
            <div className="card" key={cinema.showId}  style={{width:'300px'}}>
            <img className="card-img-top" src={cinema.image} alt={cinema.name} style={{width:'100%'}} />
            <div className="card-body">
              <h4 style={{color:'black'}} data-testid="CinemaName" className="card-title">{cinema.name}</h4>
              <h4 style={{color:'black'}} data-testid="CinemaCity" className="card-title">{cinema.city}</h4>
              <h6 style={{color:'black'}}>{`Show Time:${formatDate(new Date(cinema.startAt)).toString()}`}</h6>
              <Link to="/booking">
                
                  <button
                  
                    type="button"
                    className={classes.book_btn}
                    style={{backgroundColor:'red',width:'100%',fontSize:'15px',color:'white'}}
                    onClick={() => handleBookNow(cinema)}>
                    Book Now
                  </button>
                
              </Link>
            </div>
        </div>


            // <div className={classes.poster_container} key={cinema.showId}>
            //   <img
            //     className={classes.row_poster}
            //     src={cinema.image}
            //     alt={cinema.name}
            //   />
            //   <div className={classes.movie_info}>
            //     <h3  data-testid="CinemaNameCity" >{`${cinema.name}, ${cinema.city} `}</h3>
            //     <h4>show_time:`${cinema.startAt}`</h4>
            //   </div>
              
            //  {!testing ? <Link to="/booking">
            //     <div className={classes.poster_actions}>
            //       <button
                  
            //         type="button"
            //         className={classes.book_btn}
            //         style={{backgroundColor:'red'}}
            //         onClick={() => handleBookNow(cinema)}>
            //         Book Now
            //       </button>
            //     </div>
            //   </Link>:<></>}
            

            
            // </div>

            
          );
        })}
      </div>
    </div>
  );
}

export default Cinemas;
