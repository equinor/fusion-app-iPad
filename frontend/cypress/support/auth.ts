import jwtDecode, { JwtPayload } from 'jwt-decode'
import { User } from './mock/users'

const SERVER_URL = Cypress.env('AUTH_URL') || 'http://localhost:8080'
const IPAD_CLIENT_ID = 'd83c2116-0a79-4a0d-8276-d51cdb4a6fd6'
const FUSION_CLIENT_ID = '5a842df8-3238-415d-b168-9f16a6a6031b'
const ISSUER = 'common'
const CACHE_ENTRY = 'FUSION_AUTH_CACHE'

/* Gets the access token from local cache which was stored on login. */
export const getToken = (): string => {
    const fusionStorageJson = localStorage.getItem(CACHE_ENTRY)
    if (fusionStorageJson === null) {
        throw new Error('Could not find auth token in local storage')
    }
    const fusionStorage = JSON.parse(fusionStorageJson)
    const token = fusionStorage[`${CACHE_ENTRY}:${IPAD_CLIENT_ID}:TOKEN`]
    return token
}

const tokens = new Map<User, string>()

Cypress.Commands.add('login', (user: User) => {
    cy.log('Logging with user: ' + user.username)
    if (tokens.has(user)) {
        window.localStorage.setItem(CACHE_ENTRY, tokens.get(user)!)
        return
    }

    /* Retrieve server endpoints */
    cy.request({
        method: 'GET',
        url: `${SERVER_URL}/${ISSUER}/.well-known/openid-configuration`,
    }).then(resp => {
        var authorizationURL = resp.body.authorization_endpoint
        var tokenURL = resp.body.token_endpoint

        /* Receive Authorization code */
        cy.request({
            method: 'GET',
            followRedirect: false,
            url: authorizationURL,
            qs: {
                client_id: user.username,
                scope: 'openid',
                response_type: 'code',
                redirect_uri: `${authorizationURL}/callback`,
            },
        }).then(resp => {
            /* Change to Assertion Function if used more */
            if (typeof resp.headers.location !== 'string') {
                throw new TypeError(`Expected location to be a string,
                                     but was ${resp.headers.location}`)
            }
            const redirectURL = new URL(resp.headers.location)
            const code = new URLSearchParams(redirectURL.search).get('code')

            /* Receive user Tokens with claims that match provided 'mock_claims_for' param */
            cy.request({
                method: 'POST',
                url: tokenURL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: {
                    grant_type: 'authorization_code',
                    code: code,
                    client_id: user.username,
                    mock_claims_for: user.username,
                },
            }).then(resp => {
                const idToken = resp.body.id_token
                const accessToken = resp.body.access_token

                /* Interesting claims present in the mocked token */
                type customJwtPayload = JwtPayload & {
                    oid: string
                    familyName: string
                    name: string
                    givenName: string
                    roles: string[]
                    upn: string
                }
                const decodedToken = jwtDecode<customJwtPayload>(accessToken)

                /* There is a mismatch between real token claims (aka the ones we get from Microsoft)
                 * and fusion cache (aka there is no familyName in the token). Unclear why.
                 */
                let userData = {
                    id: decodedToken.oid,
                    familyName: decodedToken.familyName,
                    fullName: decodedToken.name,
                    givenName: decodedToken.givenName,
                    roles: decodedToken.roles,
                    upn: decodedToken.upn,
                }

                /* Set data in cache just as fusion expects to find them. */
                let fusion = {
                    USER: userData,
                    [`${CACHE_ENTRY}:${FUSION_CLIENT_ID}:TOKEN`]: idToken,
                    [`${CACHE_ENTRY}:${IPAD_CLIENT_ID}:TOKEN`]: accessToken,
                }
                tokens.set(user, JSON.stringify(fusion))
                window.localStorage.setItem(CACHE_ENTRY, tokens.get(user)!)
            })
        })
    })
})

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Retrieve user token from mock-oauth2-server and store it
             * @example cy.login(extHire1)
             */
            login(value: User): Cypress.Chainable
        }
    }
}
