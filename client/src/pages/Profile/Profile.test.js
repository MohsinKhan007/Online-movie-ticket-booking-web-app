import Profile from './index';
import '@testing-library/jest-dom';
import TestRenderer  from 'react-test-renderer';
// import TestRenderer from 'react-test-renderer';
    import {render,screen,cleanup} from '@testing-library/react'

    import ReservationContext from '../../Store/ReservationContext';

    import ReservationProvider from '../../Store/ReservationProvider';

    afterEach(()=>{
        cleanup();
    })
test('Testing profile Data',()=>{
    // data to check profile
   const user={name:'Muhammad Mohsin',emailId:'mohsinwaseem65@gmail.com',role:'user'}
   render(<ReservationProvider > <Profile user={user} /> </ReservationProvider>)
    const ProfileName=screen.getByTestId('name');
    const ProfileEmail=screen.getByTestId('emailId');
    const ProfileId=screen.getByTestId('userId');
    //to check the data is not null
    expect(ProfileName).toBeInTheDocument();
    expect(ProfileEmail).toBeInTheDocument();
    expect(ProfileId).toBeInTheDocument();
    // check the correct data 
    expect(ProfileName).toHaveTextContent("Muhammad Mohsin");
    expect(ProfileEmail).toHaveTextContent("mohsinwaseem65@gmail.com");
    expect(ProfileId).toHaveTextContent('userId');


}); 

// test('matches snapshot',()=>{
//     // const todo={id:1,title:'wash dishes',completed:false};
//     // const testRenderer = TestRenderer.create(<DummmyTest />);
//     // const renderer=TestRenderer.create(<DummmyTest todo={todo} />)
//    const user={name:'Muhammad Mohsin',emailId:'mohsinwaseem65@gmail.com',role:'user'}

//     const tree = TestRenderer.create(<Profile user={user} />).toJSON()
//     console.log(testRenderer);
//     expect(tree).toMatchSnapshot();

//     // expect(tree).toMatchSnapshot();
// })

