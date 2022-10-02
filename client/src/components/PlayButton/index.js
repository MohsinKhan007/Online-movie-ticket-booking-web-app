import React from 'react';

import { useTranslation } from 'react-i18next';

import classes from './PlayButton.module.css';
import handlePlayTrailer from '../../utils/playTrailer';

function PlayButton({ movie, trailerUrl, setTrailerUrl }) {
  
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => handlePlayTrailer(movie, trailerUrl, setTrailerUrl)}>
      play
    </button>
  );
}

export default PlayButton;
