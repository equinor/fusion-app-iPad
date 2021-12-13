import { DropdownSelect, getDropdownByDataTestId, getRadioButtonByDataTestId } from '../support/helpers'

const dropdownSelect = new DropdownSelect()

export class OrderPage {
    //#region  Dropdowns
    getCountryDropdown = () => {
        return getDropdownByDataTestId('country_dropdown')
    }

    getPersonDropdown = () => {
        return getDropdownByDataTestId('person_dropdown')
    }

    getWbsDropdown = () => {
        return getDropdownByDataTestId('wbs_dropdown')
    }

    getExplosiveCategoryDropdown = () => {
        return getDropdownByDataTestId('ex_dropdown')
    }

    getAccessoriesDropdown = () => {
        return getDropdownByDataTestId('accessories_dropdown')
    }

    getUserTypeDropdown = () => {
        return getDropdownByDataTestId('user_type_dropdown')
    }
    //#endregion Dropdowns

    //#region Input Fields
    getDeliveryAddressInputField = () => {
        return cy.get('[data-testid=address_input]')
    }

    getShortnamesInputField = () => {
        return cy.get('[data-testid=shortname_input]')
    }

    getiPadAmountInputField = () => {
        return cy.get('[data-testid=ipad_amount_input]')
    }
    //#endregion Input Fields

    //#region Dialogs
    getSubmitDialog = () => {
        return cy.get('[data-testid=submit_dialog]')
    }

    getAmountWarningDialog = () => {
        return cy.get('[data-testid=amount_warning_dialog]')
    }
    //#endregion Dialogs

    //#region Buttons
    getCancelButton = () => {
        return cy.get('[data-testid=cancel_button]')
    }

    getSubmitButton = () => {
        return cy.get('[data-testid=submit_button]')
    }

    getSubmitDialogOkButton = () => {
        return cy.get('[data-testid=submit_dialog_ok_button]')
    }

    getAmountWarningDialogConfirmButton = () => {
        return cy.get('[data-testid=amount_warning_dialog_confirm_button]')
    }

    getAmountWarningDialogCancelButton = () => {
        return cy.get('[data-testid=amount_warning_dialog_cancel_button]')
    }

    getSimTypeWifiRadioButton = () => {
        return getRadioButtonByDataTestId('wifi_radio_button')
    }

    getSimType4gRadioButton = () => {
        return getRadioButtonByDataTestId('4g_radio_button')
    }
    //#endregion Buttons

    //#region Helper Functions
    fillOrderForm = () => {
        this.getPersonDropdown().click().type('{enter}')
        this.getWbsDropdown().click().type('WBSCODE1')
        cy.wait('@getWbs')
        dropdownSelect.select(this.getWbsDropdown(), 'WBSCODE1')
        this.getDeliveryAddressInputField().type('Bergen')
        this.getExplosiveCategoryDropdown().click().type('{enter}')
        this.getShortnamesInputField().type('abc')
        this.getiPadAmountInputField().type('1')
    }
    //#endregion Helper Functions
}
