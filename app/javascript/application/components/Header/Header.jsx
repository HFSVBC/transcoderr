import React, { Component } from 'react';
import {
  CHeader,
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
  }

  render() {
    return (
      <CHeader withSubheader>
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
