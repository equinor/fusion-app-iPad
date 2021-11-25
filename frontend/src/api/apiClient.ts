import { config } from '../config'

export class apiBackend {
    /* Gets the access token from local cache which was stored on login.
     * Login is handled by Fusion, we just acquire the token.
     */
    private getAccessToken = () => {
        const fusionStorageJson = localStorage.getItem(`FUSION_AUTH_CACHE`)
        if (fusionStorageJson === null) {
            throw new Error('Could not find auth token in local storage')
        }
        const fusionStorage = JSON.parse(fusionStorageJson)
        return fusionStorage[`FUSION_AUTH_CACHE:${config.AD_CLIENT_ID}:TOKEN`]
    }

    private async query<T>(method: 'GET' | 'POST' | 'DELETE', path: string, body?: T): Promise<T> {
        const token = this.getAccessToken()

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
}
