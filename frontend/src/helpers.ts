import { SearchableDropdownOption } from '@equinor/fusion-components'

export const createDropdownOptions = (list: string[], selectedOption: string): SearchableDropdownOption[] => {
    return list.map((item, index) => ({
        title: item,
        key: index.toString(),
        isSelected: item === selectedOption,
    }))
}
