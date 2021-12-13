export const getDropdownByDataTestId = (id: string) => {
    return cy.get(`[data-testid=${id}]`).children().eq(1)
}

export const getRadioButtonByDataTestId = (id: string) => {
    return cy.get(`[data-testid=${id}]`).children().eq(0)
}
