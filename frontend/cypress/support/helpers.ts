export const getDropdownByDataTestId = (id: string) => {
    return cy.get(`[data-testid=${id}]`).children().eq(1)
}

export const getRadioButtonByDataTestId = (id: string) => {
    return cy.get(`[data-testid=${id}]`).children().eq(0)
}

/**
 * COPIED FROM https://github.com/equinor/fusion-bmt/
 *
 * Expected to work on fusion selects (elements as buttons) which appear
 * in different place in the DOM, but which all contain "section".
 * Such selects appears in different place in the dom.
 * They seem impossible to identify by any other means
 */
export class DropdownSelect {
    /**
     * Selection list should already be open (one and only one)
     *
     * @param expected: full list of values
     */
    assertSelectValues = (expected: string[]) => {
        cy.get('section').children().its('length').should('eq', expected.length)
        expected.forEach(e => {
            cy.get('section').contains(e).should('exist')
        })
    }

    /**
     * Select value with text from the list
     * @param selectInput
     * @param text
     */
    select = (selectInput: Cypress.Chainable, text: string) => {
        selectInput.click()
        cy.get('section').contains('span', text).click()
    }
}
