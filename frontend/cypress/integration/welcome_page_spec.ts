import { users } from '../support/mock/users'

describe('Test Welcome page', () => {
    before(() => {
        const user = users[0]
        cy.visitProject(user)
    })
    it('Buttons exist', () => {
        cy.contains('Order').should('be.visible')
    })
})
