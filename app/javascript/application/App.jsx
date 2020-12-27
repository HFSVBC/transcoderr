import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Sidebar = React.lazy(() => import('./components/Sidebar'));
const Header = React.lazy(() => import('./components/Header'));

const VideosContainer = React.lazy(() => import('./containers/VideosContainer'));
const SeriesContainer = React.lazy(() => import('./containers/SeriesContainer'));
const ConnectContainer = React.lazy(() => import('./containers/ConnectContainer'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
); // TODO

function App() {
  return (
    <React.Suspense fallback={loading}>
      <div className="c-app c-default-layout">
        <Sidebar/>
        <div className="c-wrapper">
          <Header/>
          <div className="c-body">
            <Switch>
              <Route path="/videos" name="Videos" render={props => <VideosContainer {...props}/>} />
              <Route path="/series" name="Series" render={props => <SeriesContainer {...props}/>} />
              <Route path="/settings/connect" name="Connect" render={props => <ConnectContainer {...props}/>} />
            </Switch>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
export default App;
