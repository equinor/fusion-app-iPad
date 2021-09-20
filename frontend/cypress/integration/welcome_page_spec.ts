import { users } from '../support/mock/users'

describe('Test Welcome page', () => {
    before(() => {
        const user = users[0]
        cy.login(user)
        const frontendUrl = Cypress.env('FRONTEND_URL') || 'http://localhost:3000'
        cy.visit(frontendUrl)
    })
    it('Buttons exist', () => {
        cy.contains('Order').should('be.visible')
    })
})
