import DummmyTest from './DummyTest';
import '@testing-library/jest-dom';
import TestRenderer  from 'react-test-renderer';
// import TestRenderer from 'react-test-renderer';
    import {render,screen,cleanup} from '@testing-library/react'

    afterEach(()=>{
        cleanup();
    })
test('test',()=>{
  
   const todo={id:1,title:'wash dishes',completed:false}
   render(<DummmyTest todo={todo}/>);
    // expect(true).toBe(true);
    const todoElement=screen.getByTestId('todo-1');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent("wash dishes");
    // expect(todoElement).toContainHTML('<strike>');
}); 

test('matches snapshot',()=>{
    const todo={id:1,title:'wash dishes',completed:false};
    // const testRenderer = TestRenderer.create(<DummmyTest />);
    // const renderer=TestRenderer.create(<DummmyTest todo={todo} />)
    const tree = TestRenderer.create(<DummmyTest todo={todo} />).toJSON()
    // console.log(testRenderer);
    expect(tree).toMatchSnapshot();

    // expect(tree).toMatchSnapshot();
})

