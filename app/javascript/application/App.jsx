import React from 'react';
//import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
//import PublishContainer from './containers/PublishContainer';
//import UnpublishContainer from './containers/UnpublishContainer';
import SidebarContainer from './containers/SidebarContainer';

function App() {
  return (
    <div className="border-bottom mb-4">
      <div className="container-fluid p-0">
        <SidebarContainer/>
      </div>
    </div>
  );
}
export default App;