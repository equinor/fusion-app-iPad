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
    const topRef = useRef<HTMLButtonElement>(null)

    return (
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
            <List>
                <Tab ref={topRef}>Order iPad</Tab>
                <Tab>Return iPad</Tab>
                <Tab>Support</Tab>
                <Tab>Table</Tab>
            </List>
            <Panels>
                <StyledTabPanel>
                    <Order topRef={topRef} />
                </StyledTabPanel>
                <StyledTabPanel>
                    <Return />
                </StyledTabPanel>
                <StyledTabPanel>
                    <Support />
                </StyledTabPanel>
                <StyledTabPanel>
                    <TablePage />
                </StyledTabPanel>
            </Panels>
        </Tabs>
    )
}

export default Welcome
