import { getUserData, findUserByID } from './users'
import { fusionProjects, getFusionProjectData, findFusionProjectByID } from './projects'
import { getFusionPositionData, findFusionPositionByID } from './positions'
import { getCountries } from './countries'

const API_URL = Cypress.env('API_URL') || 'http://localhost:5000'
const settingsURL = /https:\/\/pro-s-portal-ci\.azurewebsites\.net\/api\/persons\/me\/settings\/apps\/iPad/
const featuresURL = /https:\/\/pro-s-portal-ci\.azurewebsites\.net\/log\/features/
const projectURL = /https:\/\/pro-s-context-ci\.azurewebsites\.net\/contexts\/(.+)/
const positionURL = /https:\/\/pro-s-org-ci\.azurewebsites\.net\/projects\/(.+)\/positions/
const projectsURL = /https:\/\/pro-s-context-ci\.azurewebsites\.net\/contexts$/
const personURL = /https:\/\/pro-s-people-ci\.azurewebsites\.net\/persons\/(.+?)(?:(\?\$.*)|$)/
const countryURL = `${API_URL}/Countries`
const submitURL = `${API_URL}/OrderForm`

const interceptedURLs = [settingsURL, featuresURL, projectURL, positionURL, projectsURL, personURL, countryURL, submitURL]

Cypress.Commands.add('interceptExternal', () => {
    cy.intercept(settingsURL, {})
    cy.intercept(featuresURL, {})

    cy.intercept(projectURL, req => {
        const fusionProjectId = req.url.match(projectURL)![1]
        const project = findFusionProjectByID(fusionProjectId)
        req.reply({
            body: getFusionProjectData(project),
        })
    })

    cy.intercept(positionURL, req => {
        const fusionPositionId = req.url.match(positionURL)![1]
        const position = findFusionPositionByID(fusionPositionId)
        req.reply({
            body: getFusionPositionData(position),
        })
    })

    cy.intercept(projectsURL, req => {
        req.reply({
            body: fusionProjects.map(p => {
                return getFusionProjectData(p)
            }),
        })
    })

    cy.intercept(personURL, req => {
        const id = req.url.match(personURL)![1]
        const user = findUserByID(id)
        req.reply({
            body: getUserData(user),
        })
    })
    cy.intercept(countryURL, req => {
        req.reply({
            body: getCountries(),
        })
    })

    // Mock Submit Button return
    cy.intercept(submitURL, req => {
        req.reply({
            body: '"RITM1234567_MOCKED"',
        })
    }).as('submitForm')
})

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Intercept external to iPad service calls to protected resources and return
             * dummy values
             * @example cy.interceptExternal()
             */
            interceptExternal(): void
        }
    }
}

Cypress.on('uncaught:exception', (err, runnable, promise) => {
    /**
     * Ignore exceptions thrown by fusion
     * see https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions
     */
    if (promise) {
        /* As per Cypress, "all intercepts are automatically cleared before
         * every test." If it happens while external async calls are still being
         * made, we get get unhandled promises errors. Hence for stability
         * purpose we will ignore these promises again.
         */
        const messageRegex = '> (.*)'
        const messageMatch = err.message.match(messageRegex)

        if (messageMatch) {
            const message = messageMatch[1]

            /* It looks like majority of our stability issues fall under this message: */
            if (message === 'Failed to fetch' || message === 'NetworkError when attempting to fetch resource.') {
                console.log(`Swallowing unhandled "Failed to fetch" promise:\n\n%c${err.message}\n`, 'padding-left: 30px;')
                return false
            }

            /* But a certain number falls here */
            const failingURLRegex = /\[(http.*?)\]/
            const failingURLMatch = err.message.match(failingURLRegex)
            if (failingURLMatch) {
                const failingURL = err.message.match(failingURLRegex)![1]
                for (const interceptedURL of interceptedURLs) {
                    if (failingURL.match(interceptedURL)) {
                        console.log(
                            `Swallowing unhandled promise:\n\n%c${err.message}%c\n\nas per match for intercepting regex %c${interceptedURL}`,
                            'padding-left: 30px;',
                            '',
                            'font-weight: bold;'
                        )
                        return false
                    }
                }
            }

            /* Sometimes we get an empty promise due to intercepted requests. */
            if (message === '') {
                console.log('Swallowing empty unhandled promise:\n' + err.stack)
                return false
            }

            /* Log remaining unhandled promises as Cypress sometimes doesn't log them fully */
            console.log('Unhandled promise uncaught: ' + err.message)
        }
    }

    /* thrown sometimes when navigating through stepper, looks to be from fusion */
    if (
        err.message.includes("Cannot read property 'removeEventListener' of null") ||
        err.message.includes('can\'t access property "removeEventListener", editorRef.current is null') ||
        err.message.includes("Cannot read properties of null (reading 'removeEventListener')")
    ) {
        return false
    }

    if (err.message.includes("Cannot read properties of null (reading 'removeEventListener')")) {
        return false
    }
})
