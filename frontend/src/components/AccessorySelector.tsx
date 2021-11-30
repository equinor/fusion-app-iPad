import { MultiSelect } from '@equinor/eds-core-react'
import { UseMultipleSelectionStateChange } from 'downshift'
import { accessories } from '../api/models'

interface Props {
    selectedAccessories: string[] | undefined
    setSelectedAccessories: (newAccessoryValue: string[] | undefined) => void
}

export const AccessorySelector = ({ selectedAccessories, setSelectedAccessories }: Props) => {
    function handleSelectedItemsChange(changes: UseMultipleSelectionStateChange<string>) {
        setSelectedAccessories(changes.selectedItems)
    }
    return (
        <MultiSelect
            label=""
            items={accessories}
            selectedOptions={selectedAccessories}
            handleSelectedItemsChange={handleSelectedItemsChange}
        />
    )
}
