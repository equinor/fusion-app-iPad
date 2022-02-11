import { IFusionContext, PagedResult } from '@equinor/fusion'
import { iPad, Wbs } from './models'
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

    private async query<T>(method: 'GET' | 'POST' | 'DELETE', path: string, body?: T): Promise<{ body: T; headers: Headers }> {
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
        const responseBody = await response.json().catch(e => {
            throw new Error(`Error getting json from response: ${e}`)
        })
        return { body: responseBody, headers: response.headers }
    }

    private async GET<T>(path: string): Promise<{ body: T; headers: Headers }> {
        return this.query('GET', path)
    }

    private async POST<T>(path: string, body: T): Promise<{ body: T; headers: Headers }> {
        return this.query('POST', path, body)
    }

    private async DELETE<T>(path: string, body: T): Promise<{ body: T; headers: Headers }> {
        return this.query('DELETE', path, body)
    }

    async helloWorld(): Promise<string> {
        const path = ''
        return await (
            await this.GET<string>(path)
        ).body
    }

    async getCountries(): Promise<string[]> {
        const path = 'countries'
        const result = await this.GET<string[]>(path).catch(e => {
            throw new Error('Error getting countries from Common Library : ' + e)
        })
        return result.body
    }

    async submitForm(form: string): Promise<string> {
        const path = 'order-form'
        const result = await this.POST<string>(path, form).catch(e => {
            throw new Error('Error posting form to Service Now : ' + e)
        })
        return result.body
    }

    async getWbs(wbsCode: string): Promise<Wbs[]> {
        const path = `wbs?wbsCode=${wbsCode}`
        const result = await this.GET<Wbs[]>(path).catch(e => {
            throw new Error('Error getting WBS codes from APIM : ' + e)
        })
        return result.body
    }

    async getIpads(pageNumber = 1, pageSize = 10): Promise<PagedResult<iPad>> {
        const path = `ipads?PageNumber=${pageNumber}&PageSize=${pageSize}`
        const result = await this.GET<iPad[]>(path).catch(e => {
            throw new Error('Error getting iPads from database : ' + e)
        })
        const pagination = JSON.parse(result.headers.get('x-pagination') as string)
        return { totalCount: pagination.TotalCount, items: result.body }
    }
}
