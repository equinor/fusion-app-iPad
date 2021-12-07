import { useEffect, useState } from 'react'
import { useCurrentContext } from '@equinor/fusion'
import { Radio, Button, Typography, Scrim } from '@equinor/eds-core-react'
import { SearchableDropdown, TextInput, Select } from '@equinor/fusion-components'
import { Grid } from '@material-ui/core'

import { createDropdownOptions, createDropdownOptionsFromPos, loadingDropdown } from './utils/helpers'
import { exClasses, userTypes, PositionDetails, OrderForm, initialFormState } from './api/models'
import { HelpIcon } from './components/HelpIcon'
import { SimOrderRadio } from './components/SimOrderRadio'
import { AccessorySelector } from './components/AccessorySelector'
import { OrderBehalfofPicker } from './components/OrderBehalfofPicker'
import { useValidPositionsAsync } from './utils/hooks'
import { apiBackend } from './api/apiClient'
import { SubmitFormDialog } from './components/SubmitFormDialog'
import { FieldHeader } from './components/FieldHeader'

const Order = () => {
    const api = new apiBackend()

    const [
        { exClass, country, accessories, userType, wbs, deliveryAddress, nIpads, deviceType, simType, userShortnames, orderResponsible },
        setFormState,
    ] = useState<OrderForm>(initialFormState)

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
    const [resultRitm, setResultRitm] = useState('')
    const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false)

    const [countryList, setCountryList] = useState<string[]>([])

    const [numberOfiPadsError, setNumberOfiPadsError] = useState(false)

    const [validPositions, setValidPositions] = useState<PositionDetails[]>([])
    const [hasFetchedPositions, setHasFetchedPositions] = useState(false)

    const exClassOptions = createDropdownOptions(exClasses, exClass)
    const userTypeOptions = createDropdownOptions(userTypes, userType)

    const mandatoryFields = [country, orderResponsible, wbs, deliveryAddress, exClass, userType, nIpads]

    const setSingleField = (name: string, value: any) => {
        setFormState(prevState => ({ ...prevState, [name]: value }))
    }

    useEffect(() => {
        api.getCountries().then(response => {
            setCountryList(response.sort())
        })
    }, [])
    const countryDropdown = createDropdownOptions(countryList, country!)

    const currentContext = useCurrentContext()

    useValidPositionsAsync(setValidPositions, setHasFetchedPositions, currentContext)
    const positionOptions = createDropdownOptionsFromPos(validPositions, orderResponsible, hasFetchedPositions)

    const validateIPadCount = (numberOfIPads: string) => {
        setSingleField('nIpads', numberOfIPads)
        Number(numberOfIPads) > 0 ? setNumberOfiPadsError(false) : setNumberOfiPadsError(true)
    }

    useEffect(() => {
        if (mandatoryFields.includes('') || numberOfiPadsError) {
            setIsSubmitEnabled(false)
        } else {
            setIsSubmitEnabled(true)
        }
    }, mandatoryFields)

    const buildOrderForm = (): OrderForm => {
        return {
            country: country,
            orderResponsible: orderResponsible,
            wbs: wbs,
            deliveryAddress: deliveryAddress,
            exClass: exClass,
            deviceType: deviceType,
            userType: userType,
            userShortnames: userShortnames,
            simType: simType,
            nIpads: nIpads,
            accessories: accessories,
        }
    }

    const onClickCreate = async () => {
        setIsSubmitEnabled(false)
        const orderFormString = buildOrderForm()
        const form = JSON.stringify(orderFormString)
        console.log('Submitting form: ' + form)

        const response = await api.submitForm(form)

        setResultRitm(response)

        setIsSubmitPopupOpen(true)

        console.log(response)
    }

    const handleClose = () => {
        setIsSubmitPopupOpen(false)
    }

    // This callback is called when the order is submitted and the user confirms the RITM returned
    const onRitmConfirmed = () => {
        setFormState(initialFormState)
        handleClose()
    }

    return (
        <>
            <div style={{ margin: 25, minWidth: '250px', maxWidth: '1500px' }}>
                <Grid container spacing={4} direction="column">
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'country_dropdown'}>
                            <FieldHeader headerText={'Country'} />
                            <SearchableDropdown
                                options={countryDropdown.length == 0 ? loadingDropdown : countryDropdown}
                                onSelect={item => setSingleField('country', item.title)}
                            />
                        </Grid>
                        <HelpIcon helpText={'info text'} />
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'person_dropdown'}>
                            <FieldHeader headerText={'Ordering on behalf of'} />
                            <OrderBehalfofPicker
                                positionOptions={positionOptions}
                                positions={validPositions}
                                setSingleField={setSingleField}
                            />
                        </Grid>
                        <HelpIcon helpText={'info text'} />
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5}>
                            <FieldHeader headerText={'WBS'} />
                            <TextInput
                                value={wbs}
                                onChange={value => {
                                    setSingleField('wbs', value)
                                }}
                                data-testid={'wbs_input'}
                            />
                        </Grid>
                        <HelpIcon helpText={'info text'} />
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5}>
                            <FieldHeader headerText={'Delivery address'} />
                            <TextInput
                                value={deliveryAddress}
                                onChange={value => {
                                    setSingleField('deliveryAddress', value)
                                }}
                                data-testid={'address_input'}
                            />
                        </Grid>
                        <HelpIcon helpText={'info text'} />
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'ex_dropdown'}>
                            <FieldHeader headerText={'EX classification'} />
                            <SearchableDropdown options={exClassOptions} onSelect={item => setSingleField('exClass', item.title)} />
                        </Grid>
                        <HelpIcon helpText={'info text'} />
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        {exClass !== '' ? ( //Show accessories when EX-class is chosen. TODO: different preselected depending on EXClass
                            <Grid item xs={10} sm={5} data-testid={'accessories_dropdown'}>
                                <FieldHeader headerText={'Accessories'} />
                                <AccessorySelector selectedAccessories={accessories} setSingleField={setSingleField} />
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    {deviceType === 'personal' ? (
                        userType === 'Equinor personnel' ? (
                            //Personal equinor employee device
                            <>
                                <Grid item container xs={12} spacing={3} alignItems="center">
                                    <Grid item xs={10} sm={5} data-testid={'user_type_dropdown'}>
                                        <FieldHeader headerText={'User type'} />
                                        <Select options={userTypeOptions} onSelect={item => setSingleField('userType', item.title)} />
                                    </Grid>
                                    <HelpIcon helpText={'info text'} />
                                </Grid>
                                <Grid item container xs={12} spacing={3} alignItems="center">
                                    <Grid item xs={10} sm={5}>
                                        <Grid container direction="row">
                                            <FieldHeader headerText={'Shortname users'} />
                                            <Typography variant="body_short" style={{ fontSize: '13px', marginLeft: '4px' }}>
                                                (Optional)
                                            </Typography>
                                        </Grid>
                                        <TextInput
                                            value={userShortnames}
                                            onChange={value => {
                                                setSingleField('userShortnames', value)
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
                                <Grid item container xs={12} spacing={3} alignItems="center">
                                    <Grid item xs={10} sm={5} data-testid={'user_type_dropdown'}>
                                        <FieldHeader headerText={'User type'} />
                                        <Select options={userTypeOptions} onSelect={item => setSingleField('userType', item.title)} />
                                    </Grid>
                                    <HelpIcon helpText={'info text'} />
                                </Grid>
                                <SimOrderRadio radioCheckedSIM={simType} setSingleField={setSingleField} />
                            </>
                        )
                    ) : (
                        // Multi-device order
                        <></>
                    )}
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5}>
                            <FieldHeader headerText={'Number of iPads'} />
                            <TextInput
                                value={nIpads}
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
            {isSubmitPopupOpen && (
                <Scrim onClose={handleClose}>
                    <SubmitFormDialog onConfirmClick={onRitmConfirmed} ritm={resultRitm}></SubmitFormDialog>
                </Scrim>
            )}
        </>
    )
}

export default Order
