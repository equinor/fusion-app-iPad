import { useState, useRef } from 'react'
import { Tabs } from '@equinor/eds-core-react'
import styled from 'styled-components'

import Order from './Order'
import Support from './Support'
import Return from './Return'
import TablePage from './TablePage'

const { List, Tab, Panel, Panels } = Tabs

const StyledTabPanel = styled(Panel)`
    padding-top: 0px;
    border-top: 1px solid LightGray;
`

const Welcome = () => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <List>
                <Tab>Table</Tab>
                <Tab>Return iPad</Tab>
            </List>
            <Panels>
                <StyledTabPanel>
                    <TablePage />
                </StyledTabPanel>
                <StyledTabPanel>
                    <Return />
                </StyledTabPanel>
            </Panels>
        </Tabs>
    )
}

export default Welcome
