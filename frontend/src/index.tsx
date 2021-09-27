import { Context, ContextTypes, registerApp, useCurrentContext } from '@equinor/fusion'
import { Route, Switch } from 'react-router-dom'
import Welcome from './Welcome'
import Order from './Order'
import Support from './Support'
import Return from './Return'

const App = () => {
    const currentProject = useCurrentContext()

    if (!currentProject) {
        return (
            <>
                <p>Please select a project.</p>
            </>
        )
    }

    return (
        <Switch>
            <Route path="/:fusionProjectId/order" exact component={Order} />
            <Route path="/:fusionProjectId/support" exact component={Support} />
            <Route path="/:fusionProjectId/return" exact component={Return} />
            <Route path="/:fusionProjectId" exact component={Welcome} />
        </Switch>
    )
}

registerApp('iPad', {
    AppComponent: App,
    name: 'iPad Service',
    context: {
        types: [ContextTypes.Project],
        buildUrl: (context: Context | null, url: string) => {
            if (!context) return ''
            return `/${context.id}`
        },
        getContextFromUrl: (url: string) => {
            return url.split('/')[1]
        },
    },
})

if (module.hot) {
    module.hot.accept()
}
