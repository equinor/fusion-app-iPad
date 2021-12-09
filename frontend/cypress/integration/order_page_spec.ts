import { OrderPage } from '../page_objects/order_page'
import { users } from '../support/mock/users'

const orderPage = new OrderPage()

describe('Test Order page', () => {
    beforeEach(() => {
        const user = users[0]
        cy.visitProject(user)
    })
    it('Submit button is disabled', () => {
        orderPage.submitButton().should('be.disabled')
    })
    it('Accessories becomes visible when EX is chosen', () => {
        orderPage.explosiveCategoryDropdown().click().type('{enter}')
        orderPage.accessoriesDropdown().should('be.visible')
    })
    it('Submit button becomes not disabled', () => {
        orderPage.submitButton().should('be.disabled')
        orderPage.fillOrderForm()
        orderPage.submitButton().should('not.be.disabled')
    })
    it('Submit action creates popup dialog', () => {
        orderPage.fillOrderForm()
        orderPage.submitButton().should('not.be.disabled')
        orderPage.submitButton().click()
        cy.wait('@submitForm')
        orderPage.submitDialog().should('be.visible')
    })
})
