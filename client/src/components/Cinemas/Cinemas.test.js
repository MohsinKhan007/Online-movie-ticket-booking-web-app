import React,{useEffect, useState,useContext} from 'react';
import { render,screen,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
// import ReservationContext from '../../Store/ReservationContext';
import Cinemas from './index';
// import { renderHook } from '@testing-library/react-hooks'
import { renderHook, act } from '@testing-library/react-hooks/dom'
import ReservationProvider from '../../Store/ReservationContext';
// import ReservationProvider from './Store/ReservationProvider';
// import AuthProvider from './Store/AuthProvider';

afterEach(()=>{
    cleanup();
});


test('Test Cinema details',()=>{
   //data of movie 
    const movieData= {
        description: {
            "en": "Story of an CIA soldier and an rougue CIA soldier "
        },
        _id: "632d478b24abee245821ee09",
        title: "The Gray Man",
        posterImage: "https://occ-0-1361-56.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABaH3VeUfxH4u10mxgmzJMrHNzJxmKw_s7J5j0k3Ox7vZNgJW16iPthEm1dAB-gFdjA8dI_-1FKqZLhqb-ZRGnWFjlIP6Gn1M-bqxtkkn2h_Svo55ZS--tp37KqeNsfMDGoZFXQ.jpg?r=fb8",
        bannerImage: "https://i.ibb.co/9493V21/1232204.jpg",
        genre: "Action",
        duration: 132,
        cast: "Chris Evans, Ryan Gosling, Ana de Armas",
        originalLanguage: "en",
        releaseDate: "2022-09-29T13:22:15.000Z",
        endDate: "2022-10-30T15:22:15.000Z",
        
    };
    renderHook(
        //redux context
    <ReservationProvider>
        <Cinemas/>
    </ReservationProvider>
    )
    //getting data from screen class through reducer global store and testing it in 
    const CinemaName=screen.getByTestId('CinemaName');
    const CinemaCity=screen.getByTestId('CinemaCity');
    const CinemaPrice=screen.getByTestId('CinemaPrice');
    //present
    expect(CinemaName).toBeInTheDocument();
    expect(CinemaCity).toBeInTheDocument();
    expect(CinemaPrice).toBeInTheDocument();
        
});



test('Check List of playing now Movie in Cinema',()=>{

    renderHook(
        //redux context
    <ReservationProvider>
        <Cinemas movieType='Playingnow'/>
    </ReservationProvider>
    )
        //checking data of movies in screen component(2 componenet data interation testing)
    const MovieName=screen.getByTestId('MovieName');
    const MovieGenre=screen.getByTestId('MovieGenre');
    expect(MovieName).toBeInTheDocument();
    expect(MovieGenre).toBeInTheDocument();
    
});

test('Check list of incomming movies',()=>{


    renderHook(
        //redux context
    <ReservationProvider >
        <Cinemas movieType='incomming'/>
    </ReservationProvider>
    )
    const MovieName=screen.getByTestId('MovieName');
    const MovieGenre=screen.getByTestId('MovieGenre');
    expect(MovieName).toBeInTheDocument();
    expect(MovieGenre).toBeInTheDocument();


})