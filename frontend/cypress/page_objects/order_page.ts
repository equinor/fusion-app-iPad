import { getDropdownByDataTestId } from "../support/helpers"

export class OrderPage{

    countryDropdown = () => {
        return getDropdownByDataTestId("country_dropdown")
    }

    personDropdown = () => {
        return getDropdownByDataTestId("person_dropdown")
    }
    
    explosiveCategoryDropdown = () => {
        return getDropdownByDataTestId("ex_dropdown")
    }

    accessoriesDropdown = () => {
        return getDropdownByDataTestId("accessories_dropdown")
    }

    userTypeDropdown = () => {
        return getDropdownByDataTestId("user_type_dropdown")
    }

    deliveryAddressInputField = () => {
        return cy.get('[data-testid=address_input]')
    }

    wbsInputField = () => {
        return cy.get('[data-testid=wbs_input]')
    }

    shortnamesInputField = () => {
        return cy.get('[data-testid=shortname_input]')
    }

    // TODO: Rename consistently
    iPadCountInputField = () => {
        return cy.get('[data-testid=numberipads_input]')
    }

    cancelButton = () => {
        return cy.get('[data-testid=cancel_button]')
    }

    submitButton = () => {
        return cy.get('[data-testid=submit_button]')
    }

    submitDialog = () => {
        return cy.get('[data-testid=submit_dialog]')
    }

    countWarningDialog = () => {
        return cy.get('[data-testid=count_warning_dialog]')
    }

    // Helper functions
    fillOrderForm = () => {
        this.countryDropdown().click()
        this.personDropdown().click().type('{enter}')
        this.wbsInputField().type('123')
        this.deliveryAddressInputField().type('Bergen')
        this.explosiveCategoryDropdown().click().type('{enter}')
        this.shortnamesInputField().type('abc')
        this.iPadCountInputField().type('1')
    }
}