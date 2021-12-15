import { useEffect, useState } from 'react'
import { Context, ContextTypes, registerApp, useCurrentContext, useCurrentUser, useFusionContext } from '@equinor/fusion'
import { ErrorBoundary } from '@equinor/fusion-components'
import { Route, Switch } from 'react-router-dom'

import Welcome from './Welcome'
import Order from './Order'
import Support from './Support'
import Return from './Return'
import { config } from './config'

const App = () => {
    const currentUser = useCurrentUser()
    const currentProject = useCurrentContext()
    const fusionContext = useFusionContext()
    const [hasLoggedIn, setHasLoggedIn] = useState(false)

    const login = async () => {
        const isLoggedIn = await fusionContext.auth.container.registerAppAsync(config.AD_CLIENT_ID, [])

        if (!isLoggedIn) {
            await fusionContext.auth.container.loginAsync(config.AD_CLIENT_ID)
            return
        }

        setHasLoggedIn(true)
    }

    useEffect(() => {
        login()
    }, [])

    if (!currentUser || !hasLoggedIn) {
        return <p>Please log in.</p>
    }

    if (!currentProject) {
        return (
            <>
                <p>Please select a project.</p>
            </>
        )
    }

    return (
        <ErrorBoundary>
            <Switch>
                <Route path="/:fusionProjectId/order" exact component={Order} />
                <Route path="/:fusionProjectId/support" exact component={Support} />
                <Route path="/:fusionProjectId/return" exact component={Return} />
                <Route path="/:fusionProjectId" exact component={Welcome} />
            </Switch>
        </ErrorBoundary>
    )
}

registerApp('iPad', {
    AppComponent: App,
    name: 'iPad Service',
    context: {
        types: [ContextTypes.OrgChart],
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
