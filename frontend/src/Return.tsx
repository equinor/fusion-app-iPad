import { Banner } from '@equinor/eds-core-react'
import { Button } from '@equinor/fusion-components'

const Return = () => {
    return (
        <>
            <Banner>
                <Banner.Message>To return an iPad, please use the Service-Now solution by clicking the button below.</Banner.Message>
                <Banner.Actions placement="bottom">
                    <Button url={'https://equinor.service-now.com/selfservice?id=sc_cat_item&sys_id=18f643a36f51f900a7c62dc71e3ee437'}>
                        Return iPad
                    </Button>
                </Banner.Actions>
            </Banner>
            <Banner>
                <Banner.Message>
                    To change ownership of an iPad, please use the Service-Now solution by clicking the button below and selecting the
                    dropdown-option "Change ownership of iPad".
                </Banner.Message>
                <Banner.Actions placement="bottom">
                    <Button url={'https://equinor.service-now.com/selfservice?id=sc_cat_item&sys_id=886323f7dbca2f00855b9d51ba961911'}>
                        Change ownership
                    </Button>
                </Banner.Actions>
            </Banner>
        </>
    )
}

export default Return
