import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Media']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Movies',
    to: '/media/movies',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'TV Shows',
    to: '/media/tv_shows',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Jobs']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Active',
    to: '/jobs/active',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Settings']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Auth',
    to: '/settings/auth',
    icon: 'cil-drop',
  }
]