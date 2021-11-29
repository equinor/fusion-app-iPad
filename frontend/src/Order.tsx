import { useEffect, useState } from 'react'
import { useCurrentContext } from '@equinor/fusion'
import { SearchableDropdown, TextInput } from '@equinor/fusion-components'
import { Radio, Button, Typography, Dialog, Scrim } from '@equinor/eds-core-react'
import { Grid } from '@material-ui/core'

import { createDropdownOptions, createDropdownOptionsFromPos, loadingDropdown } from './utils/helpers'
import { exClasses, userTypes, PositionDetails, OrderForm } from './api/models'
import { HelpIcon } from './components/HelpIcon'
import { SimOrderRadio } from './components/SimOrderRadio'
import { UserTypeDropdown } from './components/UserTypeDropdown'
import { AccessorySelector } from './components/AccessorySelector'
import { OrderBehalfofPicker } from './components/OrderBehalfofPicker'
import { useValidPositionsAsync } from './utils/hooks'
import { apiBackend } from './api/apiClient'
import { SubmitFormDialog } from './components/SubmitFormDialog'

const Order = () => {
    const api = new apiBackend()

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
    const [resultRitm, setResultRitm] = useState('')
    const [submitPopupOpen, setSubmitPopupOpen] = useState(false)
    const [selectedExClass, setSelectedExClass] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('Norway')
    const [countryList, setCountryList] = useState<string[]>([])
    const [selectedAccessories, setSelectedAccessories] = useState<string[] | undefined>(['Charger Plug', 'Neck Strap'])
    const [selectedUserType, setSelectedUserType] = useState('Equinor personnel')
    const [wbs, setWbs] = useState('')
    const [address, setAddress] = useState('')
    const [ipadCount, setIpadCount] = useState('')
    const [numberOfiPadsError, setNumberOfiPadsError] = useState(false)
    const [deviceType, setDeviceType] = useState('personal')
    const [radioCheckedSIM, setRadioCheckedSIM] = useState('wifi')
    const [shortname, setShortname] = useState('')
    const [validPositions, setValidPositions] = useState<PositionDetails[]>([])
    const [selectedPositionId, setSelectedPositionId] = useState('')
    const [hasFetched, setHasFetched] = useState(false)

    const exClassOptions = createDropdownOptions(exClasses, selectedExClass)
    const userTypeOptions = createDropdownOptions(userTypes, selectedUserType)

    const mandatoryFields = [selectedCountry, selectedPositionId, wbs, address, selectedExClass, selectedUserType, ipadCount]

    useEffect(() => {
        api.getCountries().then(response => {
            setCountryList(response.sort())
        })
    }, [])
    const countryDropdown = createDropdownOptions(countryList, selectedCountry)

    const currentContext = useCurrentContext()

    useValidPositionsAsync(setValidPositions, setHasFetched, currentContext)
    const positionOptions = createDropdownOptionsFromPos(validPositions, selectedPositionId, hasFetched)

    const validateIPadCount = (numberOfIPads: string) => {
        setIpadCount(numberOfIPads)
        Number(numberOfIPads) > 0 ? setNumberOfiPadsError(false) : setNumberOfiPadsError(true)
    }

    useEffect(() => {
        if (mandatoryFields.includes('') || numberOfiPadsError) {
            setIsSubmitEnabled(false)
        } else {
            setIsSubmitEnabled(true)
        }
    }, mandatoryFields)

    const buildOrderForm: OrderForm = {
        country: selectedCountry,
        orderResponsible: selectedPositionId,
        wbs: wbs,
        deliveryAddress: address,
        exClass: selectedExClass,
        deviceType: deviceType,
        userType: selectedUserType,
        userShortnames: shortname,
        externalUserSimType: radioCheckedSIM,
        nIpads: Number(ipadCount),
    }

    const onClickCreate = async () => {
        setIsSubmitEnabled(false)
        const orderFormString = buildOrderForm
        const form = JSON.stringify(orderFormString)
        console.log('Submitting form: ' + form)

        const response = await api.submitForm(form)

        setResultRitm(response)

        setSubmitPopupOpen(true)

        console.log(response)
    }

    const handleClose = () => {
        setSubmitPopupOpen(false)
    }

    // This callback is called when the order is submitted and the user confirms the RITM returned
    const onConfirmedSubmit = () => {
        handleClose()
    }

    return (
        <>
            <div style={{ margin: 25, minWidth: '250px', maxWidth: '1500px' }}>
                <Grid container spacing={4} direction="column">
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'country_dropdown'}>
                            <SearchableDropdown
                                label="Country"
                                options={countryDropdown.length == 0 ? loadingDropdown : countryDropdown}
                                onSelect={item => setSelectedCountry(item.title)}
                            />
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
                                <AccessorySelector
                                    selectedAccessories={selectedAccessories}
                                    setSelectedAccessories={setSelectedAccessories}
                                />
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid container>
                        <Grid item xs={10} sm={3} data-testid={'personal_device'}>
                            <Radio
                                label="Personal device"
                                value="personal"
                                checked={deviceType === 'personal'}
                                onChange={() => {
                                    setDeviceType('personal')
                                }}
                            />
                        </Grid>
                        <Grid item xs={10} sm={3} data-testid={'multi_user_device'}>
                            <Radio
                                label="Multi-user device"
                                value="multi"
                                checked={deviceType === 'multi'}
                                onChange={() => {
                                    setDeviceType('multi')
                                }}
                            />
                        </Grid>
                    </Grid>
                    {deviceType === 'personal' ? (
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
                        <Button disabled={!isSubmitEnabled} data-testid={'submit_button'} onClick={onClickCreate}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
            {submitPopupOpen && (
                <Scrim onClose={handleClose}>
                    <SubmitFormDialog onConfirmClick={onConfirmedSubmit} ritm={resultRitm} data-testid={'submit_dialog'}></SubmitFormDialog>
                </Scrim>
            )}
        </>
    )
}

export default Order
