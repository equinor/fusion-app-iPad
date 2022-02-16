import { useEffect, useState } from 'react'
import { useCurrentContext } from '@equinor/fusion'
import { Button, Typography, Scrim } from '@equinor/eds-core-react'
import { SearchableDropdown, TextInput, Select } from '@equinor/fusion-components'
import { Grid } from '@material-ui/core'

import { createDropdownOptions, createDropdownOptionsFromPos, loadingAsideComponent, loadingDropdown } from './utils/helpers'
import { exClasses, userTypes, PositionDetails, OrderForm, initialFormState, ErrorProps } from './api/models'
import { HelpIcon } from './components/HelpIcon'
import { SimOrderRadio } from './components/SimOrderRadio'
import { AccessorySelector } from './components/AccessorySelector'
import { OrderBehalfofPicker } from './components/OrderBehalfofPicker'
import { useGetCountriesAsync, useValidPositionsAsync } from './utils/hooks'
import { apiBackend } from './api/apiClient'
import { SubmitFormDialog, AmountWarningDialog } from './components/CustomDialogs'
import { FieldHeader } from './components/FieldHeader'
import { WbsPicker } from './components/WbsPicker'
import { ErrorHandler } from './components/ErrorHandler'

interface Props {
    topRef: React.RefObject<HTMLElement>
}

const Order = ({ topRef }: Props) => {
    const api = new apiBackend()

    const [
        {
            exClass,
            country,
            accessories,
            userType,
            wbsCode,
            deliveryAddress,
            iPadAmount,
            deviceType,
            simType,
            userShortnames,
            orderResponsible,
        },
        setFormState,
    ] = useState<OrderForm>(initialFormState)

    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
    const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [countryList, setCountryList] = useState<string[]>([])

    const [isiPadAmountError, setIsiPadAmountError] = useState(false)
    const [isiPadAmountWarning, setIsiPadAmountWarning] = useState(false)
    const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false)
    const iPadAmountWarningLimit = 10

    const [validPositions, setValidPositions] = useState<PositionDetails[]>([])
    const [hasFetchedPositions, setHasFetchedPositions] = useState(false)

    const exClassOptions = createDropdownOptions(exClasses, exClass)
    const userTypeOptions = createDropdownOptions(userTypes, userType)

    const mandatoryFields = [country, orderResponsible, wbsCode, deliveryAddress, exClass, userType, iPadAmount]

    const errorProps: ErrorProps = { setIsError, setErrorMessage }
    const setSingleField = (name: string, value: any) => {
        setFormState(prevState => ({ ...prevState, [name]: value }))
    }

    useGetCountriesAsync(setCountryList, errorProps)
    const countryDropdown = createDropdownOptions(countryList, country!)

    const currentContext = useCurrentContext()

    useValidPositionsAsync(setValidPositions, setHasFetchedPositions, currentContext, errorProps)
    const positionOptions = createDropdownOptionsFromPos(validPositions, orderResponsible, hasFetchedPositions)

    const validateIPadAmount = (iPadAmount: string) => {
        setSingleField('iPadAmount', iPadAmount)
        Number(iPadAmount) > 0 ? setIsiPadAmountError(false) : setIsiPadAmountError(true)
        Number(iPadAmount) > iPadAmountWarningLimit ? setIsiPadAmountWarning(true) : setIsiPadAmountWarning(false)
    }

    useEffect(() => {
        if (mandatoryFields.includes('') || isiPadAmountError) {
            setIsSubmitEnabled(false)
        } else {
            setIsSubmitEnabled(true)
        }
    }, mandatoryFields)

    const buildOrderForm = (): OrderForm => {
        return {
            country: country,
            orderResponsible: orderResponsible,
            wbsCode: wbsCode,
            deliveryAddress: deliveryAddress,
            exClass: exClass,
            deviceType: deviceType,
            userType: userType,
            userShortnames: userShortnames,
            simType: simType,
            iPadAmount: iPadAmount,
            accessories: accessories,
        }
    }

    const submitForm = async () => {
        setIsSubmitEnabled(false)
        const orderFormString = buildOrderForm()
        const form = JSON.stringify(orderFormString)
        console.log('Submitting form: ' + form)
        setIsSubmitPopupOpen(true)
        //Call POST to database here
        setIsOrderSubmitted(true)
    }

    const onClickSubmit = async () => {
        if (isiPadAmountWarning) setIsWarningPopupOpen(true)
        else submitForm()
    }

    const handleClose = () => {
        setIsSubmitPopupOpen(false)
        setIsWarningPopupOpen(false)
        setIsSubmitEnabled(true)
    }

    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView()
        }
    }

    // This callback is called when the order is submitted and the user confirms
    const onOrderConfirmed = () => {
        setFormState(initialFormState)
        // Clear order received flag
        setIsOrderSubmitted(false)
        handleClose()
        scrollToTop()
    }

    return (
        <>
            <div style={{ margin: 25, minWidth: '250px', maxWidth: '1500px' }}>
                <ErrorHandler isError={isError} errorMessage={errorMessage}></ErrorHandler>
                <Grid container spacing={4} direction="column">
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'country_dropdown'}>
                            <FieldHeader headerText={'Country'} />
                            <SearchableDropdown
                                options={countryDropdown.length == 0 ? loadingDropdown : countryDropdown}
                                onSelect={item => setSingleField('country', item.title)}
                                asideComponent={loadingAsideComponent}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5}>
                            <FieldHeader headerText={'Delivery address'} />
                            <TextInput
                                value={deliveryAddress}
                                placeholder="e.g. BE-SV NF4"
                                onChange={value => {
                                    setSingleField('deliveryAddress', value)
                                }}
                                data-testid={'address_input'}
                            />
                        </Grid>
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
                        <Grid item xs={10} sm={5} data-testid={'wbs_dropdown'}>
                            <FieldHeader headerText={'WBS'} />
                            <WbsPicker wbsCode={wbsCode} setSingleField={setSingleField} errorProps={errorProps} />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'ex_dropdown'}>
                            <FieldHeader headerText={'EX classification'} />
                            <Select options={exClassOptions} onSelect={item => setSingleField('exClass', item.title)} />
                        </Grid>
                        <HelpIcon helpText={'Zone 1: Description. Zone2: Description'} />
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'accessories_dropdown'}>
                            <FieldHeader headerText={'Accessories'} />
                            <AccessorySelector selectedAccessories={accessories} setSingleField={setSingleField} />
                        </Grid>
                        <HelpIcon helpText={'Default accessories:'} />
                    </Grid>
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5} data-testid={'user_type_dropdown'}>
                            <FieldHeader headerText={'User type'} />
                            <Select options={userTypeOptions} onSelect={item => setSingleField('userType', item.title)} />
                        </Grid>
                    </Grid>
                    {userType === 'Equinor personnel' ? (
                        //Equinor employee device
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
                    ) : (
                        //External employee device
                        <SimOrderRadio radioCheckedSIM={simType} setSingleField={setSingleField} />
                    )}
                    <Grid item container xs={12} spacing={3} alignItems="center">
                        <Grid item xs={10} sm={5}>
                            <FieldHeader headerText={'Number of iPads'} />
                            <TextInput
                                value={iPadAmount}
                                onChange={value => {
                                    validateIPadAmount(value)
                                }}
                                error={isiPadAmountError}
                                errorMessage="The number of iPads must be a number greater than 0"
                                data-testid={'ipad_amount_input'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item>
                        <Button variant="outlined" href="/" data-testid={'cancel_button'}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={!isSubmitEnabled} data-testid={'submit_button'} onClick={onClickSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
            {isSubmitPopupOpen && (
                <Scrim onClose={handleClose}>
                    <SubmitFormDialog onConfirmClick={onOrderConfirmed} isLoading={!isOrderSubmitted}></SubmitFormDialog>
                </Scrim>
            )}
            {isWarningPopupOpen && (
                <Scrim onClose={handleClose}>
                    <AmountWarningDialog
                        onCancelClick={handleClose}
                        onConfirmClick={() => {
                            handleClose()
                            submitForm()
                        }}
                        amount={iPadAmount}
                    ></AmountWarningDialog>
                </Scrim>
            )}
        </>
    )
}

export default Order
