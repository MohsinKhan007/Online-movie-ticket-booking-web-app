import React from 'react';

import { useTranslation } from 'react-i18next';

import classes from './PlayButton.module.css';
import handlePlayTrailer from '../../utils/playTrailer';

function PlayButton({ movie, trailerUrl, setTrailerUrl }) {
  
  return (
    <button
      type="button"
      className="btn btn-success"
      style={{paddingLeft:'20px',paddingRight:'20px'}}
      onClick={() => handlePlayTrailer(movie, trailerUrl, setTrailerUrl)}>
      Play Trailer
    </button>
  );
}

export default PlayButton;
