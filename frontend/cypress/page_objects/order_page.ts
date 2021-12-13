import { getDropdownByDataTestId } from '../support/helpers'


export class OrderPage {
    getCountryDropdown = () => {
        return getDropdownByDataTestId('country_dropdown')
    }

    getPersonDropdown = () => {
        return getDropdownByDataTestId('person_dropdown')
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

    getDeliveryAddressInputField = () => {
        return cy.get('[data-testid=address_input]')
    }

    getWbsInputField = () => {
        return cy.get('[data-testid=wbs_input]')
    }

    getShortnamesInputField = () => {
        return cy.get('[data-testid=shortname_input]')
    }

    getiPadAmountInputField = () => {
        return cy.get('[data-testid=ipad_amount_input]')
    }

    getCancelButton = () => {
        return cy.get('[data-testid=cancel_button]')
    }

    getSubmitButton = () => {
        return cy.get('[data-testid=submit_button]')
    }

    getSubmitDialog = () => {
        return cy.get('[data-testid=submit_dialog]')
    }

    getSubmitDialogOkButton = () => {
        return cy.get('[data-testid=submit_dialog_ok_button]')
    }

    getAmountWarningDialog = () => {
        return cy.get('[data-testid=amount_warning_dialog]')
    }

    getAmountWarningDialogConfirmButton = () => {
        return cy.get('[data-testid=amount_warning_dialog_confirm_button]')
    }

    getAmountWarningDialogCancelButton = () => {
        return cy.get('[data-testid=amount_warning_dialog_cancel_button]')
    }

    // Helper functions
    fillOrderForm = () => {
        this.getPersonDropdown().click().type('{enter}')
        this.getWbsInputField().type('123')
        this.getDeliveryAddressInputField().type('Bergen')
        this.getExplosiveCategoryDropdown().click().type('{enter}')
        this.getShortnamesInputField().type('abc')
        this.getiPadAmountInputField().type('1')
    }
}
