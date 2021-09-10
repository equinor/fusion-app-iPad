import { useState } from 'react'
import { SearchableDropdown, SearchableDropdownOption, TextInput } from '@equinor/fusion-components'
import { Radio, Button, EdsProvider } from '@equinor/eds-core-react'
import { Grid } from '@material-ui/core'

import { createDropdownOptions } from './helpers'
import { exClasses, userTypes, dummyList } from './api/models'

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
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <SearchableDropdown label="Project" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                </Grid>
                <Grid item xs={6}>
                    <SearchableDropdown label="Country" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                </Grid>
            </Grid>
            <Grid item sm={6}>
                <SearchableDropdown
                    label="Ordering on behalf of"
                    options={dropdownOptions}
                    onSelect={item => setSelectedOption(item.title)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextInput
                    label="Project wbs"
                    value={wbs}
                    onChange={value => {
                        setWbs(value)
                    }}
                />
            </Grid>
            <Grid item sm={6}>
                <TextInput
                    label="Delivery address"
                    value={address}
                    onChange={value => {
                        setAddress(value)
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <SearchableDropdown label="EX classification" options={exClassOptions} onSelect={item => setSelectedExClass(item.title)} />
            </Grid>
            <Radio
                label="Personal device"
                value="personal"
                checked={radioChecked === 'personal'}
                onChange={() => {
                    setRadioChecked('personal')
                }}
            />
            <Radio
                label="Multi-user device"
                value="multi"
                checked={radioChecked === 'multi'}
                onChange={() => {
                    setRadioChecked('multi')
                }}
            />
            <Grid item xs={6}>
                <SearchableDropdown label="User type" options={userTypeOptions} onSelect={item => setSelectedUserType(item.title)} />
            </Grid>
            <Radio
                label="No, WIFI only"
                value="wifi"
                checked={radioCheckedSIM === 'wifi'}
                onChange={() => {
                    setRadioCheckedSIM('wifi')
                }}
            />
            <Radio
                label="Yes, SIM with 4G"
                value="sim"
                checked={radioCheckedSIM === 'sim'}
                onChange={() => {
                    setRadioCheckedSIM('sim')
                }}
            />
            <Grid item xs={6}>
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
            <Grid item xs={6}>
                <TextInput
                    label="Shortname users"
                    value={shortname}
                    onChange={value => {
                        setShortname(value)
                    }}
                />
            </Grid>
            <EdsProvider density="compact">
                <Button variant="outlined" href="/">
                    {' '}
                    Cancel{' '}
                </Button>
                <Button disabled={numberOfiPadsError}> Create </Button>
            </EdsProvider>
        </div>
    )
}

export default Order
