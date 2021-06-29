import React, { useReducer } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { DispatchContext, StateContext } from './App.Context'
import { reducer, initial_state } from './App.Reducer'

import { Home, Detail } from './page'
import { Layout } from './components'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial_state)
  return (
    <Router>
      <Layout>
        <Switch>
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/detail/:type">
                <Detail />
              </Route>
              {/* <Redirect to="/" path="*" /> */}
            </DispatchContext.Provider>
          </StateContext.Provider>
        </Switch>
      </Layout>
    </Router>
  )
}
