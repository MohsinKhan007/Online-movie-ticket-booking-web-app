
import {render,screen,cleanup} from '@testing-library/react'; 
import '@testing-library/jest-dom'
import Checking from './Checking';

const checkingProps=["hello","hi","world",123];
//call in loop

test('testing component is working fine',()=>{

    const render=(<Checking />);
    


})


test('test',()=>{

    //make an array of 

    const result=render(<Checking value="prop"/>)
    // const todoElement=screen.getByTestId('todo-1');
    const someElement = result.container.querySelector('#todo-1');
    //utility testing
    //snapshot testing 
    //utility testing
    //Dom testing through API Call
    //mock an api call
    //fetch code and pass prop
    //all tesing
    //API,Dom, api value changes dom or not(TDD test driven development)
    expect(someElement).toBeInTheDocument();
    expect(someElement).toHaveTextContent("Hello world")
    expect(someElement)
});


// import { render, screen } from '@testing-library/react'
// import { SIDEBAR_MENUS } from '../src/constants/gobalConsts'
// import App from './App'
// import { ISideMenu } from './types/globalTypes'

// test('Check whether header has the text', () => {
//     render(<App />)
//     const linkElement = screen.getByText(/What's new/i)
//     expect(linkElement).toBeInTheDocument()
// })

// test('Check whether screen has Welcome Message', () => {
//     render(<App />)
//     const linkElement = screen.getByText(/Welcome/i)
//     expect(linkElement).toBeInTheDocument()
// })

// test('check select menu', () => {
//     render(<App />)
//     const select = screen.getByText(/Select your shop/i)
//     expect(select).toBeInTheDocument()
// })

// const testSideBarMenus = (menusList: ISideMenu[]) => {
//     menusList.forEach((menu) => {
//         test(`check menu item: ${menu.title}`, () => {
//             render(<App />)
//             const textMenu = screen.queryAllByText(
//                 new RegExp('\\b' + menu.title + '\\b')
//             )

//             expect(textMenu[0]).toBeInTheDocument()
//         })
//     })
// }

// testSideBarMenus(SIDEBAR_MENUS)


//https://meet.google.com/qmm-mrgv-tas