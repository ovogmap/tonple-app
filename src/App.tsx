import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { Home, Detail } from './page'
import { Layout } from './components'

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Redirect to="/" path="*" />
        </Switch>
      </Layout>
    </Router>
  )
}
