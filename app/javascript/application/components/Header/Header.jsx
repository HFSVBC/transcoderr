import React, { Component } from 'react';
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CSubheader,
  CHeaderNav,
  CHeaderNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSidebarMobile = this.toggleSidebarMobile.bind(this);
  }

  toggleSidebar() {
    const val = [true, 'responsive'].includes(this.props.sidebarShow) ? false : 'responsive';
    this.props.setSidebarShow(val);
  }

  toggleSidebarMobile() {
    const val = [false, 'responsive'].includes(this.props.sidebarShow) ? true : 'responsive'
    this.props.setSidebarShow(val);
  }

  render() {
    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={this.toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={this.toggleSidebar}
        />

        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <h1 className="c-sidebar-brand-full">Transcoderr</h1>
        </CHeaderBrand>

        <CHeaderNav className="px-3 ml-auto">
          <CHeaderNavItem className="px-3" >
          </CHeaderNavItem>
          <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
          >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
              <div className="c-avatar">
                <i className="c-avatar-img far fa-user"/>
              </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem href="/sign_out">
                <i className="mfe-2 far fa-sign-out-alt"/>
                Logout
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        {this.props.children &&
          <CSubheader className="px-3 justify-content-end">
            {this.props.children}
          </CSubheader>
        }

      </CHeader>
    );
  }
}

export default Header;
