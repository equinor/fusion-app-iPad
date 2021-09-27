import { Button } from '@equinor/fusion-components'
import { RouteComponentProps } from 'react-router-dom'

interface Params {
    fusionProjectId: string
}

const Welcome = ({ match }: RouteComponentProps<Params>) => {
    const fusionProjectId = match.params.fusionProjectId

    return (
        <div>
            <Button relativeUrl={`${fusionProjectId}/order`}> Order </Button>
            <Button relativeUrl={`${fusionProjectId}/support`}> Support </Button>
            <Button relativeUrl={`${fusionProjectId}/return`}> Return </Button>
        </div>
    )
}

export default Welcome
