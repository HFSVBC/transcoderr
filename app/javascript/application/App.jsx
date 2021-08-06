import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';

const Sidebar = React.lazy(() => import('./components/Sidebar'));
const Header = React.lazy(() => import('./components/Header'));

const ConnectionsContainer = React.lazy(() => import('./containers/ConnectionsContainer'));
const ProfilesContainer = React.lazy(() => import('./containers/ProfilesContainer'));
const SeriesContainer = React.lazy(() => import('./containers/SeriesContainer'));
const TasksContainer = React.lazy(() => import('./containers/TasksContainer'));
const VideosContainer = React.lazy(() => import('./containers/VideosContainer'));
const VideoContainer = React.lazy(() => import('./containers/VideoContainer'));

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
          <Switch>
            <Route exact path="/videos" name="Videos" render={props => <VideosContainer {...props}/>} />
            <Route exact path="/videos/:id" name="Videos" render={props => <VideoContainer {...props} id={props.match.params.id}/>} />
            <Route exact path="/series" name="Series" render={props => <SeriesContainer {...props}/>} />
            <Route exact path="/settings/profiles" name="Profiles" render={props => <ProfilesContainer {...props}/>} />
            <Route exact path="/settings/connect" name="Connect" render={props => <ConnectionsContainer {...props}/>} />
            <Route exact path="/system/tasks" name="Tasks" render={props => <TasksContainer {...props}/>} />
          </Switch>
        </div>
      </div>
    </React.Suspense>
  );
}
export default App;
