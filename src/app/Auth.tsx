import NotFoundPage from '@/pages/NotFound/NotFoundPage'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import ManagePage from '@/pages/Manage/ManagePage'
import MonitorPage from '@/pages/Monitor/MonitorPage'
import OrganizationPage from '@/pages/Organization/OrganizationPage'
import UsersPage from '@/pages/Users/UsersPage'
import SystemPage from '@/pages/System/SystemPage'
import TestPage from '@/pages/Test/TestPage'

function AuthApp() {
  return (
    <Switch>
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/manage" component={ManagePage} />
      <Route exact path="/monitor" component={MonitorPage} />
      <Route exact path="/organization" component={OrganizationPage} />
      <Route exact path="/users" component={UsersPage} />
      {/* <Route exact path="/test" component={TestPage} /> */}

      <Route exact path="/system" component={SystemPage} />
      <Route exact path="/" component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default AuthApp
