import { PositionInstance } from '@equinor/fusion'
import { SearchableDropdownOption, SelectOption } from '@equinor/fusion-components'
import { PositionDetails, Wbs } from '../api/models'

export const createDropdownOptions = (list: string[], selectedOption: string): SearchableDropdownOption[] | SelectOption[] => {
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
                title: 'Loading...',
                key: 'loading',
                isDisabled: true,
            },
        ]
    }
    if (list.length === 0) {
        return [
            {
                title: 'No eligible people found', //What to display here? Unrealistic case?
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
export const createDropdownOptionsFromWbs = (
    list: Wbs[],
    selectedOption: string,
    isQuerying: boolean,
    searchQuery: string
): SearchableDropdownOption[] => {
    if (isQuerying) {
        return [
            {
                title: 'Loading...',
                key: 'loading',
                isDisabled: true,
            },
        ]
    }
    if (list.length === 0) {
        if (searchQuery.length > 4) {
            return [
                {
                    title: "No WBS's found",
                    key: 'empty',
                    isDisabled: true,
                },
            ]
        } else {
            return [
                {
                    title: 'Start typing to search',
                    key: 'typing',
                    isDisabled: true,
                },
            ]
        }
    }
    return list.map(item => ({
        title: item.code,
        key: item.code,
        isSelected: item.code === selectedOption,
    }))
}

export const getValidPosition = (instances: PositionInstance[]) => {
    const date = new Date()
    return instances.filter(i => i.appliesFrom.getTime() < date.getTime() && i.appliesTo.getTime() > date.getTime())[0]
}

export const getName = (instance: PositionInstance) => {
    return instance?.assignedPerson !== null ? instance?.assignedPerson.name : 'notValid'
}

export const loadingDropdown: SearchableDropdownOption[] = [
    {
        title: 'Loading...',
        key: '0',
        isDisabled: true,
    },
]
