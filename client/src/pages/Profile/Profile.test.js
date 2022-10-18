import Profile from './index';
import '@testing-library/jest-dom';


    import {render,screen,cleanup} from '@testing-library/react'


    import ReservationProvider from '../../Store/ReservationProvider';
    import AuthProvider from '../../Store/AuthProvider';

    afterEach(()=>{
        cleanup();
    })
test('Test the User Profile Component Data',()=>{
    
    //Mock User to pass and render the component
   const user={name:'Muhammad Mohsin',emailId:'mohsinwaseem65@gmail.com',role:'user'}
   render(<AuthProvider><ReservationProvider > <Profile user={user} /> </ReservationProvider> </AuthProvider>)
    
    // Testing profiling 
    //making ket value pairs
    const keys = Object.keys(user)

    //Getting DOM elements by data-testid
    const maps = keys.map((item, index) => screen.getByTestId(item))
    
    // Matching to be present in the document
    maps.forEach((item) => expect(item).toBeInTheDocument())

    //MAtching to present the correct value
    maps.forEach((item, index) =>expect(item).toHaveValue(user[keys[index]]));
   
   
}); 
