import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Loader from './components/Loader';

import ReservationProvider from './Store/ReservationProvider';
import AuthProvider from './Store/AuthProvider';

import './App.css';
// import EditMovie from './pages/Movies/EditMovie';

// Home page
const HomePage = lazy(() => import('./pages/HomePage'));

// Explore all page
const ExploreAll = lazy(() => import('./pages/ExploreAll'));

// Showtimings page
const ShowTimings = lazy(() => import('./pages/ShowTimings'));

// Booking page
const Booking = lazy(() => import('./pages/Booking'));

// Sign In and sign Up Form page
const Form = lazy(() => import('./pages/Form'));

// Payment success page
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));

// Payment failure page
const PaymentFailure = lazy(() => import('./pages/PaymentFailure'));

//userProfile
const userProfile=lazy(()=>import('./pages/Profile'))


const MoviesPage=lazy(()=>import('./pages/Movies'));
const EditMovie=lazy(()=>import('./pages/Movies/EditMovie'));
const CreateMovie=lazy(()=>import('./pages/Movies/CreateMovie'));
const ViewMovies=lazy(()=>import('./pages/Movies/ViewMovie'));
// Page not found 404 page
const PageNotFound = lazy(() => import('./pages/PageNotFound'));



function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <AuthProvider>
          <ReservationProvider>
            <div className="app">
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/playingnow" exact component={ExploreAll} />
                <Route path="/comingsoon" exact component={ExploreAll} />
                <Route path="/signin" exact component={Form} />
                <Route path="/signup" exact component={Form} />
                <Route path="/booking" exact component={Booking} />
                <Route path ="/movies" exact component={MoviesPage} />
                <Route path='/edit-movie/:movieId' exact component={EditMovie}/>
                <Route path='/create-movie' component={CreateMovie} />
                <Route path='/view-movie/:movieId' component={ViewMovies} />
                <Route
                  path="/payment-success"
                  exact
                  component={PaymentSuccess}
                />
                <Route
                path="/profile"
                exact
                component={userProfile} 
                />
                <Route
                  path="/payment-failure"
                  exact
                  component={PaymentFailure}
                />
                <Route
                  path="/showtimings/:movieId"
                  exact
                  component={ShowTimings}
                />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </div>
          </ReservationProvider>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routes;
