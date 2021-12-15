import { useEffect } from 'react'
import { useApiClients, Context } from '@equinor/fusion'

import { PositionDetails } from '../api/models'
import { getName, getValidPosition } from './helpers'

export const useValidPositionsAsync = (
    setValidPositions: (newPositions: PositionDetails[]) => void,
    setHasFetched: (newState: boolean) => void,
    currentContext: Context | null,
    setIsError: (newState: boolean) => void,
    setErrorMessage: (newState: string) => void
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
                    setErrorMessage(reason)
                    setIsError(true)
                }
            )
        }
    }, [currentContext])
}
