import { useCallback, useEffect } from 'react'
import { useApiClients, Context } from '@equinor/fusion'

import { PositionDetails, ErrorProps } from '../api/models'
import { getName, getValidPosition } from './helpers'
import { apiBackend } from '../api/apiClient'

export const useValidPositionsAsync = (
    setValidPositions: (newPositions: PositionDetails[]) => void,
    setHasFetched: (newState: boolean) => void,
    currentContext: Context | null,
    errorProps: ErrorProps
) => {
    const apiClients = useApiClients()
    const positionNames = ['CC Manager', 'Construction Manager', 'Commissioning Manager', 'Project Manager', 'Project Director']
    useEffect(() => {
        //Filter out correct positions. map id, name and assigned person and corresponding name. Finally filter invalid elements
        if (currentContext?.externalId) {
            apiClients.org.getPositionsAsync(currentContext.externalId).then(
                response => {
                    setValidPositions(
                        response.data
                            .filter(position => positionNames.some(substring => position.name.includes(substring)))
                            .map(
                                (position): PositionDetails => ({
                                    positionId: position.id,
                                    positionName: position.name,
                                    assignedPerson: getValidPosition(position.instances)?.assignedPerson,
                                    assignedPersonName: getName(getValidPosition(position.instances)),
                                })
                            )
                            .filter(element => element.assignedPerson !== undefined && element.assignedPerson !== null)
                    )
                    setHasFetched(true)
                },
                reason => {
                    errorProps.setErrorMessage(reason)
                    errorProps.setIsError(true)
                }
            )
        }
    }, [currentContext])
}

export const useGetCountriesAsync = (setCountryList: (newCountries: string[]) => void, errorProps: ErrorProps) => {
    const api = new apiBackend()
    useEffect(() => {
        api.getCountries().then(
            response => {
                setCountryList(response.sort())
            },
            reason => {
                errorProps.setErrorMessage(reason)
                errorProps.setIsError(true)
            }
        )
    }, [])
}

export const useFetchWbs = (
    canQuery: (query: string) => boolean,
    setIsQuerying: (isQuerying: boolean) => void,
    setWbsList: (response: any) => void,
    errorProps: ErrorProps
) => {
    const api = new apiBackend()
    return useCallback(async (query: string) => {
        if (canQuery(query)) {
            try {
                const response = await api.getWbs(query)
                setWbsList(response)
                setIsQuerying(false)
            } catch (e) {
                console.log('Error fetching WBS list')
                if (e instanceof Error) {
                    errorProps.setErrorMessage(e.message)
                    errorProps.setIsError(true)
                }
                setIsQuerying(false)
                setWbsList([])
            }
        }
    }, [])
}
