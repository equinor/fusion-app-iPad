import { Tabs } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { useState } from 'react'
import Order from './Order'
import Support from './Support'
import Return from './Return'

const { List, Tab, Panel, Panels } = Tabs

const StyledTabPanel = styled(Panel)`
    padding-top: 0px;
    border-top: 1px solid LightGray;
`

interface Params {
    fusionProjectId: string
}

const Welcome = () => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <List>
                <Tab>Order iPad</Tab>
                <Tab>Return iPad</Tab>
                <Tab>Support</Tab>
            </List>
            <Panels>
                <StyledTabPanel>
                    <Order />
                </StyledTabPanel>
                <StyledTabPanel>
                    <Return />
                </StyledTabPanel>
                <StyledTabPanel>
                    <Support />
                </StyledTabPanel>
            </Panels>
        </Tabs>
    )
}

export default Welcome
