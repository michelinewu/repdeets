import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {
  Homepage,
  Deets
} from './components'
import StatCard from './components/StatCard'

const Routes = (props) => (
  <Router {...props}>
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/statcard" component={StatCard} />
        <Route path="/:repId" render={routeProps => <Deets {...routeProps}/>} />
      </Switch>
  </Router>
)

export default Routes
