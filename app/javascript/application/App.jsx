import React from 'react';
//import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
//import PublishContainer from './containers/PublishContainer';
//import UnpublishContainer from './containers/UnpublishContainer';
import SidebarContainer from './containers/SidebarContainer';

function App() {
  return (
    <div className="c-app c-default-layout">
      <SidebarContainer/>
      <div className="c-wrapper">
        <div className="c-body">
        </div>
      </div>
    </div>
  );
}
export default App;