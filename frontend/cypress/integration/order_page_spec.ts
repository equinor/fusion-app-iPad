import { OrderPage } from '../page_objects/order_page'
import { users } from '../support/mock/users'
import { DropdownSelect } from '../support/helpers'

const orderPage = new OrderPage()
const dropdownSelect = new DropdownSelect()

describe('Test Order page', () => {
    beforeEach(() => {
        const user = users[0]
        cy.visitProject(user)
    })

    it('Submit button is disabled', () => {
        orderPage.getSubmitButton().should('be.disabled')
    })

    it('Submit button becomes not disabled', () => {
        orderPage.getSubmitButton().should('be.disabled')
        orderPage.fillOrderForm()
        orderPage.getSubmitButton().should('not.be.disabled')
    })

    it('Sim Type radio buttons become available when choosing "External hire or Contractor"', () => {
        orderPage.fillOrderForm()

        // Select external hire from dropdown
        orderPage.getUserTypeDropdown().click()
        dropdownSelect.select(orderPage.getUserTypeDropdown(), 'External hire or Contractor')

        // Look for buttons
        orderPage.getSimType4gRadioButton().should('be.visible')
        orderPage.getSimTypeWifiRadioButton().should('be.visible')
    })

    it('Sim Type radio buttons function as expected"', () => {
        orderPage.fillOrderForm()

        // Select external hire from dropdown
        orderPage.getUserTypeDropdown().click()
        dropdownSelect.select(orderPage.getUserTypeDropdown(), 'External hire or Contractor')

        // Look for buttons
        orderPage.getSimType4gRadioButton().should('be.visible')
        orderPage.getSimTypeWifiRadioButton().should('be.visible')

        // Click 4G button
        orderPage.getSimType4gRadioButton().click()

        // Form should still submit
        orderPage.getSubmitButton().should('not.be.disabled')
        orderPage.getSubmitButton().click()
    })

    it('Submit action creates popup dialog', () => {
        orderPage.fillOrderForm()
        orderPage.getSubmitButton().should('not.be.disabled')
        orderPage.getSubmitButton().click()
        cy.wait('@submitForm')
        orderPage.getSubmitDialog().should('be.visible')
        orderPage.getSubmitDialogOkButton().click()
    })

    it('Submit action creates warning dialog if iPad amount too large', () => {
        orderPage.fillOrderForm()
        orderPage.getiPadAmountInputField().type('12')
        orderPage.getSubmitButton().should('not.be.disabled')
        orderPage.getSubmitButton().click()
        orderPage.getAmountWarningDialog().should('be.visible')
    })

    it('Warning dialog buttons work as expected', () => {
        orderPage.fillOrderForm()
        orderPage.getiPadAmountInputField().type('12')
        orderPage.getSubmitButton().should('not.be.disabled')
        orderPage.getSubmitButton().click()

        // Cancel from amount warning
        orderPage.getAmountWarningDialog().should('be.visible')
        orderPage.getAmountWarningDialogCancelButton().click()

        // Submit again
        orderPage.getSubmitButton().should('not.be.disabled')
        orderPage.getSubmitButton().click()

        // Confirm amount in warning
        orderPage.getAmountWarningDialog().should('be.visible')
        orderPage.getAmountWarningDialogConfirmButton().click()

        cy.wait('@submitForm')
        orderPage.getSubmitDialog().should('be.visible')
    })
})
