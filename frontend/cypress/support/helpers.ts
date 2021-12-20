export const getDropdownByDataTestId = (id: string) => {
    return cy.get(`[data-testid=${id}]`).children().eq(1)
}

export const getRadioButtonByDataTestId = (id: string) => {
    return cy.get(`[data-testid=${id}]`).children().eq(0)
}

export const getChecklistElement = (element: string) => {
    return cy.get('li').contains(element)
}

export const getChecklistElementCheckbox = (element: string) => {
    return getChecklistElement(element).prev().children().eq(0)
}

export const assertChecklistChecks = (checklist: string[], expectedChecked: string[]) => {
    checklist.forEach(element => {
        const checkedValue = expectedChecked.includes(element) ? 'be.checked' : 'not.be.checked'
        getChecklistElementCheckbox(element).should(checkedValue)
    })
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
