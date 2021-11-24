import { Banner } from '@equinor/eds-core-react'
import { Button } from '@equinor/fusion-components'
import { RouteComponentProps } from 'react-router-dom'

interface Params {
    fusionProjectId: string
}

const Welcome = ({ match }: RouteComponentProps<Params>) => {
    const fusionProjectId = match.params.fusionProjectId

    return (
        <Banner>
            <Banner.Actions>
                <Button relativeUrl={`${fusionProjectId}/order`}> Order iPad </Button>
                <Button relativeUrl={`${fusionProjectId}/support`}> Support </Button>
                <Button relativeUrl={`${fusionProjectId}/return`}> Return iPad </Button>
            </Banner.Actions>
        </Banner>
    )
}

export default Welcome
