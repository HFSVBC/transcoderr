import React, { Component } from 'react';
import {
  CHeader,
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
  }

  render() {
    return (
      <CHeader>
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
      </CHeader>
    );
  }
}

export default Header;
