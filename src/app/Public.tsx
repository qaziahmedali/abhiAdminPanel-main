import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import HomePage from '@/pages/Home/HomePage'
import LoginPage from '@/pages/Login/LoginPage'
import NotFoundPage from '@/pages/NotFound/NotFoundPage'
// import DasghboardPage from "@/pages/Dashboard/DashboardPage";

function PublicApp() {
  return (
    <Switch>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default PublicApp
