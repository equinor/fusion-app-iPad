import { IFusionContext } from '@equinor/fusion'
import { Wbs } from './models'
import { config } from '../config'

export class apiBackend {
    /* Gets the access token. Checks first if cached token exist and is valid.
     * If not, get a new one and cache it.
     */
    private async fetchAccessToken() {
        const contextStore: { [key: string]: any } = window
        const context: IFusionContext = contextStore[config.FUSION_CONTEXT_KEY]
        return await context.auth.container.acquireTokenAsync(config.AD_CLIENT_ID)
    }

    private async query<T>(method: 'GET' | 'POST' | 'DELETE', path: string, body?: T): Promise<T> {
        const token = await this.fetchAccessToken()

        const headers = {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        }

        const init: RequestInit = {
            method,
            headers,
        }
        if (body !== undefined) {
            init.body = JSON.stringify(body)
        }

        const url = `${config.API_URL}/${path}`

        const response = await fetch(url, init)
        if (!response.ok)
            return response.text().then(errorText => {
                throw new Error(`Error with query: ${errorText}`)
            })
        return response.json().catch(e => {
            throw new Error(`Error getting json from response: ${e}`)
        })
    }

    private async GET<T>(path: string): Promise<T> {
        return this.query('GET', path)
    }

    private async POST<T>(path: string, body: T): Promise<T> {
        return this.query('POST', path, body)
    }

    private async DELETE<T>(path: string, body: T): Promise<T> {
        return this.query('DELETE', path, body)
    }

    async helloWorld(): Promise<string> {
        const path = ''
        return await this.GET<string>(path)
    }

    async getCountries(): Promise<string[]> {
        const path = 'Countries'
        return await this.GET<string[]>(path)
    }

    async submitForm(form: string): Promise<string> {
        const path = 'order-form'
        return await this.POST<string>(path, form)
    }

    async getWbs(wbsCode: string): Promise<Wbs[]> {
        const path = `Wbs?wbsCode=${wbsCode}`
        return await this.GET<Wbs[]>(path)
    }
}
