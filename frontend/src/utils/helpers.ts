import { PositionInstance } from '@equinor/fusion'
import { SearchableDropdownOption } from '@equinor/fusion-components'
import { PositionDetails } from '../api/models'

export const createDropdownOptions = (list: string[], selectedOption: string): SearchableDropdownOption[] => {
    return list.map((item, index) => ({
        title: item,
        key: index.toString(),
        isSelected: item === selectedOption,
    }))
}

export const createDropdownOptionsFromPos = (
    list: PositionDetails[],
    selectedOption: string,
    hasFetched: boolean
): SearchableDropdownOption[] => {
    if (!hasFetched) {
        return [
            {
                title: 'Searching...',
                key: 'searching',
                isDisabled: true,
            },
        ]
    }
    if (list.length === 0) {
        return [
            {
                title: 'No people found', //What to display here? Unrealistic case?
                key: 'empty',
                isDisabled: true,
            },
        ]
    }
    return list.map((item, index) => ({
        title: item.assignedPersonName + ' ' + item.positionName,
        key: item.positionId,
        isSelected: item.positionId === selectedOption,
    }))
}

export const getValidPosition = (instances: PositionInstance[]) => {
    const date = new Date()
    return instances.filter(i => i.appliesFrom.getTime() < date.getTime() && i.appliesTo.getTime() > date.getTime())[0]
}

export const getName = (instance: PositionInstance) => {
    return instance?.assignedPerson !== null ? instance?.assignedPerson.name : 'notValid'
}
