import { OrderPage } from '../page_objects/order_page'
import { users } from '../support/mock/users'

const orderPage = new OrderPage()

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
