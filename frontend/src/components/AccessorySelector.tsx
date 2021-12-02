import { MultiSelect } from '@equinor/eds-core-react'
import { UseMultipleSelectionStateChange } from 'downshift'
import { accessoryOptions } from '../api/models'

interface Props {
    selectedAccessories: string[] | undefined
    setSingleField: (name: string, value: any) => void
}

export const AccessorySelector = ({ selectedAccessories, setSingleField }: Props) => {
    function handleSelectedItemsChange(changes: UseMultipleSelectionStateChange<string>) {
        setSingleField('accessories', changes.selectedItems)
    }
    return (
        <MultiSelect
            label=""
            items={accessoryOptions}
            selectedOptions={selectedAccessories}
            handleSelectedItemsChange={handleSelectedItemsChange}
        />
    )
}
