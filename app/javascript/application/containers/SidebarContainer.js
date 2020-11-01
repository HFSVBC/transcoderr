import React, { Component } from 'react';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import navigation from './_nav'

class SidebarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarShow: true
    };
    
    this.handleSidebarShowChange = this.handleSidebarShowChange.bind(this);
  }
  
  handleSidebarShowChange(val) {
    this.setState({
      sidebarShow: val
    });
  }
    
  render() {
    return (
      <CSidebar 
        show={this.state.sidebarShow}
        onShowChange={this.handleSidebarShowChange}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
          Transcoderr
        </CSidebarBrand>
        <CSidebarNav>
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none"/>
      </CSidebar>
    );
  }
}

export default SidebarContainer;
