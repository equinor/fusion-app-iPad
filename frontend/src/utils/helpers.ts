import { SearchableDropdownOption } from '@equinor/fusion-components'
import { PositionDetails } from '../api/models'

export const createDropdownOptions = (list: string[], selectedOption: string): SearchableDropdownOption[] => {
    return list.map((item, index) => ({
        title: item,
        key: index.toString(),
        isSelected: item === selectedOption,
    }))
}

export const createDropdownOptionsFromPos = (list: PositionDetails[], selectedOption: string): SearchableDropdownOption[] => {
    return list.map((item, index) => ({
        title: item.assignedPersonName + ' ' + item.positionName,
        key: item.positionId,
        isSelected: item.positionId === selectedOption,
    }))
}
