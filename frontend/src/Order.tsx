import { useEffect, useState } from 'react'
import { useApiClients, useCurrentContext } from '@equinor/fusion'
import { SearchableDropdown, TextInput } from '@equinor/fusion-components'
import { Radio, Button, Typography } from '@equinor/eds-core-react'
import { Grid } from '@material-ui/core'

import { createDropdownOptions, createDropdownOptionsFromPos, getValidPosition, getName } from './utils/helpers'
import { exClasses, userTypes, dummyList, PositionDetails } from './api/models'
import { HelpIcon } from './components/HelpIcon'
import { SimOrderRadio } from './components/SimOrderRadio'
import { UserTypeDropdown } from './components/UserTypeDropdown'
import { AccessorySelector } from './components/AccessorySelector'
import { OrderBehalfofPicker } from './components/OrderBehalfofPicker'

const Order = () => {
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedExClass, setSelectedExClass] = useState('')
    const [selectedAccessories, setSelectedAccessories] = useState<string[] | undefined>(['Charger Plug', 'Neck Strap'])
    const [selectedUserType, setSelectedUserType] = useState('Equinor personnel')
    const [wbs, setWbs] = useState('')
    const [address, setAddress] = useState('')
    const [ipadCount, setIpadCount] = useState('')
    const [numberOfiPadsError, setNumberOfiPadsError] = useState(false)
    const [radioChecked, setRadioChecked] = useState('personal')
    const [radioCheckedSIM, setRadioCheckedSIM] = useState('wifi')
    const [shortname, setShortname] = useState('')
    const [validPositions, setValidPositions] = useState<PositionDetails[]>([])
    const [selectedPositionId, setSelectedPositionId] = useState('')
    const [hasFetched, setHasFetched] = useState(false)

    const dropdownOptions = createDropdownOptions(dummyList, selectedOption)
    const exClassOptions = createDropdownOptions(exClasses, selectedExClass)
    const userTypeOptions = createDropdownOptions(userTypes, selectedUserType)

    const apiClients = useApiClients()
    const currentContext = useCurrentContext()

    const validateIPadCount = (numberOfIPads: string) => {
        setIpadCount(numberOfIPads)
        Number(numberOfIPads) > 0 ? setNumberOfiPadsError(false) : setNumberOfiPadsError(true)
    }

    const isCreateDisabled = () => {
        return (
            selectedOption === '' ||
            selectedPositionId === '' ||
            selectedExClass === '' ||
            wbs === '' ||
            address === '' ||
            ipadCount === '' ||
            numberOfiPadsError
        )
    }

    useEffect(() => {
        //Filter out correct positions. map id, name and assigned person and corresponding name. Finally filter invalid elements
        if (currentContext?.externalId) {
            apiClients.org.getPositionsAsync(currentContext.externalId).then(response => {
                setValidPositions(
                    response.data
                        .filter(position => position.name.includes('Manager'))
                        .map(
                            (position): PositionDetails => ({
                                positionId: position.id,
                                positionName: position.name,
                                assignedPerson: getValidPosition(position.instances)?.assignedPerson,
                                assignedPersonName: getName(getValidPosition(position.instances)),
                            })
                        )
                        .filter(element => element.assignedPerson !== undefined && element.assignedPerson !== null)
                )
                setHasFetched(true)
            })
        }
    }, [currentContext])

    const positionOptions = createDropdownOptionsFromPos(validPositions, selectedPositionId, hasFetched)

    return (
        <div style={{ margin: 25, minWidth: '250px', maxWidth: '1500px' }}>
            <Grid container spacing={4} direction="column">
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5} data-testid={'project_dropdown'}>
                        <SearchableDropdown label="Project" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                    <Grid item xs={10} sm={5} data-testid={'country_dropdown'}>
                        <SearchableDropdown label="Country" options={dropdownOptions} onSelect={item => setSelectedOption(item.title)} />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5} data-testid={'person_dropdown'}>
                        <Typography variant="body_short" style={{ fontSize: '13px' }}>
                            Ordering on behalf of
                        </Typography>
                        <OrderBehalfofPicker
                            positionOptions={positionOptions}
                            positions={validPositions}
                            setSelectedPositionID={setSelectedPositionId}
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
                            data-testid={'wbs_input'}
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
                            data-testid={'address_input'}
                        />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    <Grid item xs={10} sm={5} data-testid={'ex_dropdown'}>
                        <SearchableDropdown
                            label="EX classification"
                            options={exClassOptions}
                            onSelect={item => setSelectedExClass(item.title)}
                        />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
                <Grid item container xs={12} spacing={3} alignItems="center">
                    {selectedExClass != '' ? ( //Show accessories when EX-class is chosen. TODO: different preselected depending on EXClass
                        <Grid item xs={10} sm={5} data-testid={'accessories_dropdown'}>
                            <AccessorySelector selectedAccessories={selectedAccessories} setSelectedAccessories={setSelectedAccessories} />
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
                <Grid container>
                    <Grid item xs={10} sm={3} data-testid={'personal_radio'}>
                        <Radio
                            label="Personal device"
                            value="personal"
                            checked={radioChecked === 'personal'}
                            onChange={() => {
                                setRadioChecked('personal')
                            }}
                        />
                    </Grid>
                    <Grid item xs={10} sm={3} data-testid={'multi_user_radio'}>
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
                                        data-testid={'shortname_input'}
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
                            errorMessage="The number of iPads must be a number greater than 0"
                            data-testid={'numberipads_input'}
                        />
                    </Grid>
                    <HelpIcon helpText={'info text'} />
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item>
                    <Button variant="outlined" href="/" data-testid={'cancel_button'}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button disabled={isCreateDisabled()} data-testid={'create_button'}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Order
