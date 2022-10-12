import React from 'react';

import Routes from './Routes';
import DummmyTest from './components/DummyTest/DummyTest';
function App() {

  const todos=[
    {id:1,title:'wash dishes',completed:true},
    {id:2, title:'make dinner',completed:false}
];

  return <>
  <Routes />
  {todos.map((todo)=>{
    <DummmyTest todo={todo} />
    })};
    </>
}

export default App;
