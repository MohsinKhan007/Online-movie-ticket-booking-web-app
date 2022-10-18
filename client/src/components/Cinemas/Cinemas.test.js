import Cinemas from './index';
import BookNowButton from '../BookNowButton';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import {render,screen,cleanup,waitFor } from '@testing-library/react'
import ReservationProvider from '../../Store/ReservationProvider';
import AuthProvider from '../../Store/AuthProvider';
import ShowTiming from '../../pages/ShowTimings/index';
import {expect, jest, test} from '@jest/globals';
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';
jest.setTimeout(15000);
const onClick = jest.fn()
afterEach(()=>{
    cleanup();
});


test('Test Cinema details in Cinema Component',()=>{
 
   const CinemaDetails=[{
    seats: {
        row0: [],
        row1: [
            "Seat 1*1",
            "Seat 1*2",
            "Seat 1*3",
            "Seat 1*4",
            "Seat 1*5",
            "Seat 1*6",
            "Seat 1*8",
            "Seat 1*9",
            "Seat 1*10"
        ],
        row2: [
            "Seat 2*1",
            "Seat 2*2",
            "Seat 2*3",
            "Seat 2*4",
            "Seat 2*5",
            "Seat 2*6",
            "Seat 2*7",
            "Seat 2*8",
            "Seat 2*9",
            "Seat 2*10"
        ],
        row3: [
            "Seat 3*1",
            "Seat 3*2",
            "Seat 3*3",
            "Seat 3*4",
            "Seat 3*4",
            "Seat 3*5",
            "Seat 3*6",
            "Seat 3*7",
            "Seat 3*8",
            "Seat 3*9",
            "Seat 3*10"
        ],
        row4: [
            "Seat 4*1",
            "Seat 4*2",
            "Seat 4*3",
            "Seat 4*4",
            "Seat 4*5",
            "Seat 4*6",
            "Seat 4*7",
            "Seat 4*8",
            "Seat 4*9",
            "Seat 4*10"
        ],
        row5: [
            "Seat 5*1",
            "Seat 5*2",
            "Seat 5*3",
            "Seat 5*4",
            "Seat 5*5",
            "Seat 5*6",
            "Seat 5*7",
            "Seat 5*8",
            "Seat 5*9",
            "Seat 5*10"
        ],
        row6: [
            "Seat 6*1",
            "Seat 6*2",
            "Seat 6*3",
            "Seat 6*4",
            "Seat 6*5",
            "Seat 6*6",
            "Seat 6*7",
            "Seat 6*8",
            "Seat 6*9",
            "Seat 6*10"
        ],
        row7: [
            "Seat 7*1",
            "Seat 7*2",
            "Seat 7*3",
            "Seat 7*4",
            "Seat 7*5",
            "Seat 7*6",
            "Seat 7*7",
            "Seat 7*8",
            "Seat 7*9",
            "Seat 7*10"
        ],
        row8: [
            "Seat 8*1",
            "Seat 8*2",
            "Seat 8*3",
            "Seat 8*4",
            "Seat 8*5",
            "Seat 8*6",
            "Seat 8*7",
            "Seat 8*8",
            "Seat 8*9",
            "Seat 8*10"
        ],
        row9: [
            "Seat 9*1",
            "Seat 9*2",
            "Seat 9*3",
            "Seat 9*4",
            "Seat 9*5",
            "Seat 9*6",
            "Seat 9*7",
            "Seat 9*8",
            "Seat 9*9",
            "Seat 9*10"
        ]
    },
    _id: "632d4d334805f53988655763",
    name: "MINI plax screen",
    image: "https://d1e00ek4ebabms.cloudfront.net/production/fcbe6ca9-0c4d-49a7-9be5-43d46249d955.jpg",
    city: "Karlskrona",
    ticketPrice: 300,
   
}];

    render(
        <BrowserRouter>
        <AuthProvider>
            <ReservationProvider>              
                <Cinemas cinemas={CinemaDetails} selectScreen='All Screens' />
            </ReservationProvider>
        </AuthProvider>
        </BrowserRouter>
    )
    const CinemaName=screen.getByTestId('CinemaName');
    const CinemaCity=screen.getByTestId('CinemaCity')
    //present
    expect(CinemaName).toBeInTheDocument();
    expect(CinemaCity).toBeInTheDocument();
    //verifying text content
    expect(CinemaName).toHaveTextContent(`${CinemaDetails[0].name}`)
    expect(CinemaCity).toHaveTextContent(`${CinemaDetails[0].city}`);

});



it('Passing Movie Id in component and Testing  api call and DOM movie representation',async()=>{
    act(()=>{
        render(
            <AuthProvider>
            <ReservationProvider >
                <ShowTiming movieId='632d478b24abee245821ee09'  />
            </ReservationProvider>
        </AuthProvider>
        )
    })
    await waitFor(function (){
        let moviename=screen.getByTestId('name');  
            expect(moviename).toHaveTextContent('The Gray Man');
       return expect(moviename).toBeInTheDocument();
    } , {
        timeout: 10000,
      });
});


// Integration Test
test('Testing The cinema Components details by calling the ShowTimming Component',async()=>{
//     //passing single Array now checking in cinema details
    const CinemaDetails=[{
        seats: {
            row0: [],
            row1: [
                "Seat 1*1",
                "Seat 1*2",
                "Seat 1*3",
                "Seat 1*4",
                "Seat 1*5",
                "Seat 1*6",
                "Seat 1*8",
                "Seat 1*9",
                "Seat 1*10"
            ],
            row2: [
                "Seat 2*1",
                "Seat 2*2",
                "Seat 2*3",
                "Seat 2*4",
                "Seat 2*5",
                "Seat 2*6",
                "Seat 2*7",
                "Seat 2*8",
                "Seat 2*9",
                "Seat 2*10"
            ],
            row3: [
                "Seat 3*1",
                "Seat 3*2",
                "Seat 3*3",
                "Seat 3*4",
                "Seat 3*4",
                "Seat 3*5",
                "Seat 3*6",
                "Seat 3*7",
                "Seat 3*8",
                "Seat 3*9",
                "Seat 3*10"
            ],
            row4: [
                "Seat 4*1",
                "Seat 4*2",
                "Seat 4*3",
                "Seat 4*4",
                "Seat 4*5",
                "Seat 4*6",
                "Seat 4*7",
                "Seat 4*8",
                "Seat 4*9",
                "Seat 4*10"
            ],
            row5: [
                "Seat 5*1",
                "Seat 5*2",
                "Seat 5*3",
                "Seat 5*4",
                "Seat 5*5",
                "Seat 5*6",
                "Seat 5*7",
                "Seat 5*8",
                "Seat 5*9",
                "Seat 5*10"
            ],
            row6: [
                "Seat 6*1",
                "Seat 6*2",
                "Seat 6*3",
                "Seat 6*4",
                "Seat 6*5",
                "Seat 6*6",
                "Seat 6*7",
                "Seat 6*8",
                "Seat 6*9",
                "Seat 6*10"
            ],
            row7: [
                "Seat 7*1",
                "Seat 7*2",
                "Seat 7*3",
                "Seat 7*4",
                "Seat 7*5",
                "Seat 7*6",
                "Seat 7*7",
                "Seat 7*8",
                "Seat 7*9",
                "Seat 7*10"
            ],
            row8: [
                "Seat 8*1",
                "Seat 8*2",
                "Seat 8*3",
                "Seat 8*4",
                "Seat 8*5",
                "Seat 8*6",
                "Seat 8*7",
                "Seat 8*8",
                "Seat 8*9",
                "Seat 8*10"
            ],
            row9: [
                "Seat 9*1",
                "Seat 9*2",
                "Seat 9*3",
                "Seat 9*4",
                "Seat 9*5",
                "Seat 9*6",
                "Seat 9*7",
                "Seat 9*8",
                "Seat 9*9",
                "Seat 9*10"
            ]
        },
        _id: "632d4d334805f53988655763",
        name: "MINI plax screen",
        image: "https://d1e00ek4ebabms.cloudfront.net/production/fcbe6ca9-0c4d-49a7-9be5-43d46249d955.jpg",
        city: "Karlskrona",
        ticketPrice: 300,
       
    }];
    act(()=>{
    render( 
    <BrowserRouter>
        <AuthProvider>
            <ReservationProvider>
                <ShowTiming cinemas={CinemaDetails}  /> 
            </ReservationProvider>
        </AuthProvider> 
    </BrowserRouter> 
       );
    })
        //Testing Id is present in Cinema Component which is called in Show Timming Component (2 Components)
         await waitFor(()=>{
        let moviename=screen.getByTestId('CinemaName');
        let moviecity=screen.getByTestId('CinemaCity');
        expect(moviename).toBeInTheDocument();
        expect(moviename).toHaveTextContent('MINI plax screen');
        expect(moviecity).toBeInTheDocument();
        expect(moviecity).toHaveTextContent('Karlskrona');
  
},{setimeout:10000})
});



