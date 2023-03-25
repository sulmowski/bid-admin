import React from "react";
import { Switch } from "react-router-dom"
import Login from './containers/Login'
import SsoLogin from './containers/SsoLogin'
import Logout from './containers/Logout'
import Home from './containers/Home'
import PermissionDied from './containers/PermissionDied'

import Upload from "./containers/Upload"
import ArtifactsHistory from "./containers/ArtifactsHistory"
import ArtifactsDetail from "./containers/ArtifactsDetail"

import CreateJob from './containers/CreateJob'
import JobsDetail from './containers/JobsDetail'
import JobsHistory from './containers/JobsHistory'

import UserAll from './containers/UserAll'
import UserDetail from './containers/UserDetail'
import UserDetailMe from './containers/UserDetailMe'

import UnauthenticatedRoute from "./components/UnauthenticatedRoute"
import AuthenticatedRoute from "./components/AuthenticatedRoute"
import AnyRoute from "./components/AnyRoute"

export default function Routes({ appProps }) {
    return (
      <Switch>
        <AnyRoute path="/login" exact component={Login} appProps={appProps} />
        <AnyRoute path="/sso-login" exact component={SsoLogin} appProps={appProps} />
        <AnyRoute path="/logout" exact component={Logout} appProps={appProps} />
        <AnyRoute path="/permissionDied" exact component={PermissionDied} appProps={appProps} />
        
        <AuthenticatedRoute path="/upload" exact component={Upload} appProps={appProps} />
        <AuthenticatedRoute path="/artifacts-history" exact component={ArtifactsHistory} appProps={appProps} />
        <AuthenticatedRoute path="/artifacts-detail/:id" exact component={ArtifactsDetail} appProps={appProps} />
        <AuthenticatedRoute path="/create-job" exact component={CreateJob} appProps={appProps} />
        <AuthenticatedRoute path="/jobs-history" exact component={JobsHistory} appProps={appProps} />
        <AuthenticatedRoute path="/jobs-detail/:id" exact component={JobsDetail} appProps={appProps} />

        <AuthenticatedRoute path="/users-all" exact component={UserAll} appProps={appProps} />
        <AuthenticatedRoute path="/users-detail/:id" exact component={UserDetail} appProps={appProps} />
        <AuthenticatedRoute path="/users-me" exact component={UserDetailMe} appProps={appProps} />

        { /* Finally, catch all unmatched routes */ }
        {/* <AppliedRoute key="all" path="/" component={Upload} appProps={appProps} /> */}
        <AuthenticatedRoute component={Home} appProps={appProps}/>
      </Switch>
    );
  }