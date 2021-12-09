export const getDropdownByDataTestId = (id : string) => {
    return cy.get(`[data-testid=${id}}]`)
    // TODO: find actual dropdown
}