import { users } from '../support/mock/users'

describe('Test Order page', () => {
    beforeEach(() => {
        const user = users[0]
        cy.visitProject(user)
        cy.contains('Order').click()
    })
    it('Create button is disabled', () => {
        cy.get('[data-testid=create_button]').should('be.disabled')
    })
    it('Accessories becomes visible when EX is chosen', () => {
        cy.get('[data-testid=ex_dropdown]').click().type('{enter}')
        cy.get('[data-testid=accessories_dropdown]').should('be.visible')
    })
    it('Layout changes depending on device type', () => {
        cy.get('[data-testid=user_type_dropdown]').should('be.visible')
        cy.get('[data-testid=multi_user_radio]').click()
        cy.get('[data-testid=user_type_dropdown]').should('not.exist')
    })
    it('Create button becomes not disabled', () => {
        cy.get('[data-testid=create_button]').should('be.disabled')
        cy.get('[data-testid=project_dropdown]').click().type('{enter}')
        cy.get('[data-testid=person_dropdown]').click().type('{enter}')
        cy.get('[data-testid=wbs_input]').type('123')
        cy.get('[data-testid=address_input]').type('Bergen')
        cy.get('[data-testid=ex_dropdown]').click().type('{enter}')
        cy.get('[data-testid=shortname_input]').type('abc')
        cy.get('[data-testid=numberipads_input]').type('1')
        cy.get('[data-testid=create_button]').should('not.be.disabled')
    })
})
