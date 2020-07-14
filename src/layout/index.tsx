import React, { lazy } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './layout.less'
import { asyncImport } from 'components/base/getAsyncImport'

const AsyncHome = asyncImport(lazy(() => import('pages/home')))
const AsyncPrepare = asyncImport(lazy(() => import('pages/prepare')))
const AsyncGame = asyncImport(lazy(() => import('pages/game')))

export function Layout() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={AsyncHome} />
                <Route path='/prepare' component={AsyncPrepare} />
                <Route path='/game' component={AsyncGame} />
            </Switch>
        </Router>
    )
}
