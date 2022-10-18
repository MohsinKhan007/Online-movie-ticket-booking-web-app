import React from 'react';
import { render,screen,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './index';

// describe('Testing Footer Component', () => {
  test('render footer component', () => {
    render(<Footer/>)

    const FooterElement=screen.getByTestId('footer');
    expect(FooterElement).toBeInTheDocument();
    //Checking Links
    const FacebookLink=screen.getByTestId('facebookLink');
    const TwitterLink=screen.getByTestId('twitterLink');
    const linkedinLink=screen.getByTestId('linkedinLink');
    const instgramLink=screen.getByTestId('instagramLink');
    //present
    expect(FacebookLink).toBeInTheDocument();
    expect(TwitterLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(instgramLink).toBeInTheDocument();
    //correct link of facebook is present
    expect(FacebookLink.closest('a')).toHaveAttribute('href', 'https://www.facebook.com')
    expect(TwitterLink.closest('a')).toHaveAttribute('href', 'https://www.twitter.com')
    expect(linkedinLink.closest('a')).toHaveAttribute('href','https://www.linkedin.com');
    expect(instgramLink.closest('a')).toHaveAttribute('href','https://www.instagram.com');

  });


