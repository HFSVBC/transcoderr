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
  const [sidebarShow, setSidebarShow] = useState('responsive');

  return (
    <React.Suspense fallback={loading}>
      <div className="c-app c-default-layout">
        <Sidebar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow}/>
        <div className="c-wrapper">
          <Switch>
            <Route exact path="/videos" name="Videos" render={props =>
              <VideosContainer {...props} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow}/>
            } />
            <Route exact path="/videos/:id" name="Videos" render={props =>
              <VideoContainer {...props} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} id={props.match.params.id}/>
            } />
            <Route exact path="/series" name="Series" render={props =>
              <SeriesContainer {...props} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow}/>
            } />
            <Route exact path="/settings/profiles" name="Profiles" render={props =>
              <ProfilesContainer {...props} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow}/>
            } />
            <Route exact path="/settings/connect" name="Connect" render={props =>
              <ConnectionsContainer {...props} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow}/>
            } />
            <Route exact path="/system/tasks" name="Tasks" render={props =>
              <TasksContainer {...props} sidebarShow={sidebarShow} setSidebarShow={setSidebarShow}/>
            } />
          </Switch>
        </div>
      </div>
    </React.Suspense>
  );
}
export default App;
