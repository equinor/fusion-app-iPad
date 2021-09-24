import { useEffect, useState } from 'react'
import { SearchableDropdown, TextInput } from '@equinor/fusion-components'
import { Radio, Button, EdsProvider } from '@equinor/eds-core-react'
import { Grid } from '@material-ui/core'

import { createDropdownOptions } from './utils/helpers'
import { exClasses, userTypes, dummyList } from './api/models'
import { HelpIcon } from './components/HelpIcon'
import { SimOrderRadio } from './components/SimOrderRadio'
import { UserTypeDropdown } from './components/UserTypeDropdown'

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
        <div style={{ margin: 25, minWidth: '250px', maxWidth: '1500px' }}>
            <Grid container spacing={4} direction="column">
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5}>
                        <SearchableDropdown label="Project" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                    <Grid item xs={10} sm={5}>
                        <SearchableDropdown label="Country" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5}>
                        <SearchableDropdown
                            label="Ordering on behalf of"
                            options={dropdownOptions}
                            onSelect={item => setSelectedOption(item.title)}
                        />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5}>
                        <TextInput
                            label="Project wbs"
                            value={wbs}
                            onChange={value => {
                                setWbs(value)
                            }}
                        />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5}>
                        <TextInput
                            label="Delivery address"
                            value={address}
                            onChange={value => {
                                setAddress(value)
                            }}
                        />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5}>
                        <SearchableDropdown
                            label="EX classification"
                            options={exClassOptions}
                            onSelect={item => setSelectedExClass(item.title)}
                        />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid container>
                    <Grid item xs={10} sm={3}>
                        <Radio
                            label="Personal device"
                            value="personal"
                            checked={radioChecked === 'personal'}
                            onChange={() => {
                                setRadioChecked('personal')
                            }}
                        />
                    </Grid>
                    <Grid item xs={10} sm={3}>
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
                {radioChecked === 'personal' ? (
                    selectedUserType === 'Equinor personnel' ? (
                        //Personal equinor employee device
                        <>
                            <UserTypeDropdown userTypeOptions={userTypeOptions} setSelectedUserType={setSelectedUserType} />
                            <Grid item container xs={12} spacing={3} alignItems="center">
                                <Grid item xs={10} sm={5}>
                                    <TextInput
                                        label="Shortname users"
                                        value={shortname}
                                        isOptional={true}
                                        onChange={value => {
                                            setShortname(value)
                                        }}
                                    />
                                </Grid>
                                <HelpIcon helpText={'info text'} />
                            </Grid>
                        </>
                    ) : (
                        //Personal external employee device
                        <>
                            <UserTypeDropdown userTypeOptions={userTypeOptions} setSelectedUserType={setSelectedUserType} />
                            <SimOrderRadio radioCheckedSIM={radioCheckedSIM} setRadioCheckedSIM={setRadioCheckedSIM} />
                        </>
                    )
                ) : (
                    // Multi-device order
                    <></>
                )}
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5}>
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
                    <HelpIcon helpText={'info text'} />
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item>
                    <Button variant="outlined" href="/">
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button disabled={numberOfiPadsError}> Create </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Order
