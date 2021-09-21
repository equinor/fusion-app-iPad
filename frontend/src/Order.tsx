import { useState } from 'react'
import { SearchableDropdown, TextInput } from '@equinor/fusion-components'
import { Radio, Button, EdsProvider } from '@equinor/eds-core-react'
import { Grid } from '@material-ui/core'

import { createDropdownOptions } from './utils/helpers'
import { exClasses, userTypes, dummyList } from './api/models'
import { HelpIcon } from './components/HelpIcon'

const Order = () => {
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedExClass, setSelectedExClass] = useState('')
    const [selectedUserType, setSelectedUserType] = useState('Equinor personnel')
    const [wbs, setWbs] = useState('')
    const [address, setAddress] = useState('')
    const [ipadCount, setIpadCount] = useState('')
    const [numberOfiPadsError, setNumberOfiPadsError] = useState(false)
    const [radioChecked, setRadioChecked] = useState('personal')
    const [radioCheckedSIM, setRadioCheckedSIM] = useState('wifi')
    const [shortname, setShortname] = useState('')

    const dropdownOptions = createDropdownOptions(dummyList, selectedOption)
    const exClassOptions = createDropdownOptions(exClasses, selectedExClass)
    const userTypeOptions = createDropdownOptions(userTypes, selectedUserType)

    const validateIPadCount = (numberOfIPads: string) => {
        setIpadCount(numberOfIPads)
        Number(numberOfIPads) > 0 ? setNumberOfiPadsError(false) : setNumberOfiPadsError(true)
    }

    return (
        <div style={{ margin: 25 }}>
            <Grid container spacing={4} direction="column">
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={2}>
                        <SearchableDropdown label="Project" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                    <Grid item xs={2}>
                        <SearchableDropdown label="Country" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={2}>
                        <SearchableDropdown
                            label="Ordering on behalf of"
                            options={dropdownOptions}
                            onSelect={item => setSelectedOption(item.title)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={4}>
                        <TextInput
                            label="Project wbs"
                            value={wbs}
                            onChange={value => {
                                setWbs(value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={4}>
                        <TextInput
                            label="Delivery address"
                            value={address}
                            onChange={value => {
                                setAddress(value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={2}>
                        <SearchableDropdown
                            label="EX classification"
                            options={exClassOptions}
                            onSelect={item => setSelectedExClass(item.title)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
                <Grid container xs={6}>
                    <Grid item xs={3}>
                        <Radio
                            label="Personal device"
                            value="personal"
                            checked={radioChecked === 'personal'}
                            onChange={() => {
                                setRadioChecked('personal')
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Radio
                            label="Multi-user device"
                            value="multi"
                            checked={radioChecked === 'multi'}
                            onChange={() => {
                                setRadioChecked('multi')
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={2}>
                        <SearchableDropdown
                            label="User type"
                            options={userTypeOptions}
                            onSelect={item => setSelectedUserType(item.title)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    Due to tax regulations, Equinor can not supply personal SIM subscriptions for any external personnel. We have a
                    procedure for this, and PDC Device Service will be in contact to solve this with the relevant staffing agency or with
                    your contractor.
                    <br />
                    <br /> Do you want the contractor to order SIM?
                </Grid>
                <Grid container xs={6}>
                    <Grid item xs={3}>
                        <Radio
                            label="No, WIFI only"
                            value="wifi"
                            checked={radioCheckedSIM === 'wifi'}
                            onChange={() => {
                                setRadioCheckedSIM('wifi')
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Radio
                            label="Yes, SIM with 4G"
                            value="sim"
                            checked={radioCheckedSIM === 'sim'}
                            onChange={() => {
                                setRadioCheckedSIM('sim')
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={2}>
                        <TextInput
                            label="Number of iPads"
                            value={ipadCount}
                            onChange={value => {
                                validateIPadCount(value)
                            }}
                            error={numberOfiPadsError}
                            errorMessage="Number of iPads must a number greater than 0"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={4}>
                        <TextInput
                            label="Shortname users"
                            value={shortname}
                            isOptional={true}
                            onChange={value => {
                                setShortname(value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        {HelpIcon('info text')}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item>
                    <EdsProvider density="compact">
                        <Button variant="outlined" href="/">
                            Cancel
                        </Button>
                    </EdsProvider>
                </Grid>
                <Grid item>
                    <EdsProvider density="compact">
                        <Button disabled={numberOfiPadsError}> Create </Button>
                    </EdsProvider>
                </Grid>
            </Grid>
        </div>
    )
}

export default Order
