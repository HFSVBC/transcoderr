import React, { Component } from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavItem,
  CSidebarNavDropdown,
  CSidebarMinimizer
} from '@coreui/react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CSidebar
        show={this.props.sidebarShow}
        onShowChange={(val) => this.props.setSidebarShow(val)}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
          <h1 className="c-sidebar-brand-full">Transcoderr</h1>
          <h1 className="c-sidebar-brand-minimized">T</h1>
        </CSidebarBrand>
        <CSidebarNav>
          <CSidebarNavItem name="Videos" to="/videos" icon={<i className="fas fa-video c-sidebar-nav-icon"/>}/>
          <CSidebarNavItem name="Series" to="/series" icon={<i className="fas fa-tv c-sidebar-nav-icon"/>}/>
          <CSidebarNavItem name="Activity" to="/activity" icon={<i className="fas fa-clock c-sidebar-nav-icon"/>}/>
          <CSidebarNavDropdown name="Settings" to="/settings" icon={<i className="fas fa-cogs c-sidebar-nav-icon"/>}>
            <CSidebarNavItem name="Profiles" to="/settings/profiles"/>
            <CSidebarNavItem name="Connect" to="/settings/connect"/>
            <CSidebarNavItem name="General" to="/settings/general"/>
          </CSidebarNavDropdown>
          <CSidebarNavDropdown name="System" to="/system" icon={<i className="fas fa-laptop c-sidebar-nav-icon"/>}>
            <CSidebarNavItem name="Status" to="/system/status"/>
            <CSidebarNavItem name="Tasks" to="/system/tasks"/>
            <CSidebarNavItem name="Backup" to="/system/backup"/>
            <CSidebarNavItem name="Updates" to="/system/updates"/>
            <CSidebarNavItem name="Events" to="/system/events"/>
            <CSidebarNavItem name="Log Files" to="/system/log_files"/>
          </CSidebarNavDropdown>
        </CSidebarNav>

        <CSidebarMinimizer className="c-d-md-down-none"/>
      </CSidebar>
    );
  }
}

export default Sidebar;
