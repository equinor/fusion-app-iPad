import { User } from './mock/users'
import { getFusionProjectData, findFusionProjectByID } from './mock/projects'

function setProjectCache(fusionProjectId: string) {
    const project = {
        current: getFusionProjectData(findFusionProjectByID(fusionProjectId)),
    }
    window.localStorage.setItem('FUSION_CURRENT_CONTEXT', JSON.stringify(project))
}

Cypress.Commands.add('visitProject', (user: User, fusionProjectId: string = '123') => {
    cy.interceptExternal()
    setProjectCache(fusionProjectId)

    cy.login(user)
    const frontendUrl = Cypress.env('FRONTEND_URL') || 'http://localhost:3000'

    cy.visit(`${frontendUrl}/${fusionProjectId}`)
    cy.wait('@getCountries')
})

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Visit project as a specific user
             * @example cy.visitProject(user)
             */
            visitProject(user: User, fusionProjectId?: string): Chainable<void>
        }
    }
}
