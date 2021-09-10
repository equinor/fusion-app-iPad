import { registerApp } from '@equinor/fusion'
import { Route, Switch } from 'react-router-dom'
import Welcome from './Welcome'
import Order from './Order'
import Support from './Support'
import Return from './Return'

const App = () => {
    return (
        <Switch>
            <Route path="/order" exact component={Order} />
            <Route path="/support" exact component={Support} />
            <Route path="/return" exact component={Return} />
            <Route path="" exact component={Welcome} />
        </Switch>
    )
}

registerApp('iPad', {
    AppComponent: App,
    name: 'iPad Service',
})

if (module.hot) {
    module.hot.accept()
}
