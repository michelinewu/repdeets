import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {
  Homepage,
  Deets,
  Loading
} from './components'

const Routes = (props) => (
  <Router {...props}>
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/:repId" render={routeProps => <Deets {...routeProps}/>} />

      </Switch>
  </Router>
)

export default Routes
