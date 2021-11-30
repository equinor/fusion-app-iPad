import { users } from '../support/mock/users'

describe('Test Order page', () => {
    beforeEach(() => {
        const user = users[0]
        cy.visitProject(user)
    })
    it('Submit button is disabled', () => {
        cy.get('[data-testid=submit_button]').should('be.disabled')
    })
    it('Accessories becomes visible when EX is chosen', () => {
        cy.get('[data-testid=ex_dropdown]').click().type('{enter}')
        cy.get('[data-testid=accessories_dropdown]').should('be.visible')
    })
    it('Layout changes depending on device type', () => {
        cy.get('[data-testid=user_type_dropdown]').should('exist')
        cy.get('[data-testid=multi_user_device]').click()
        cy.get('[data-testid=user_type_dropdown]').should('not.exist')
    })
    it('Submit button becomes not disabled', () => {
        cy.get('[data-testid=submit_button]').should('be.disabled')
        cy.get('[data-testid=country_dropdown]').click()
        cy.contains('Norway').should('exist')
        cy.get('[data-testid=person_dropdown]').click().type('{enter}')
        cy.get('[data-testid=wbs_input]').type('123')
        cy.get('[data-testid=address_input]').type('Bergen')
        cy.get('[data-testid=ex_dropdown]').click().type('{enter}')
        cy.get('[data-testid=shortname_input]').type('abc')
        cy.get('[data-testid=numberipads_input]').type('1')
        cy.get('[data-testid=submit_button]').should('not.be.disabled')
    })
    it('Submit action creates popup dialog', () => {
        cy.get('[data-testid=country_dropdown]').click()
        cy.contains('Norway').should('exist')
        cy.get('[data-testid=person_dropdown]').click().type('{enter}')
        cy.get('[data-testid=wbs_input]').type('123')
        cy.get('[data-testid=address_input]').type('Bergen')
        cy.get('[data-testid=ex_dropdown]').click().type('{enter}')
        cy.get('[data-testid=shortname_input]').type('abc')
        cy.get('[data-testid=numberipads_input]').type('1')
        cy.get('[data-testid=submit_button]').should('not.be.disabled')
        cy.get('[data-testid=submit_button]').click()
        cy.wait('@submitForm')
        cy.get('[data-testid=submit_dialog]').should('be.visible')
    })
})
