import { PersonPhoto, SearchableDropdown, SearchableDropdownOption } from '@equinor/fusion-components'
import { PositionDetails } from '../api/models'

interface Props {
    positionsDropdown: SearchableDropdownOption[]
    pos: PositionDetails[]
    setSelectedPositionID: (newSelectedId: string) => void
}

export const OrderBehalfofPicker = ({ positionsDropdown, pos, setSelectedPositionID }: Props) => {
    const ItemComponent = (item: any) => {
        if (item.item) {
            const posDetails = pos.find(e => e.positionId === item.item.key)
            return (
                <div>
                    {posDetails?.assignedPersonName} <br />
                    {posDetails?.positionName}
                </div>
            )
        }
        return null
    }

    const SelectedComponent = (item: any) => {
        if (item.item) {
            const posDetails = pos.find(e => e.positionId === item.item.key)
            return (
                <div>
                    {posDetails?.assignedPersonName} <br />
                    {posDetails?.positionName}
                </div>
            )
        }
        return null
    }

    const AsideComponent = (item: any) => {
        const posDetails = pos.find(e => e.positionId === item.item.key)

        return posDetails?.assignedPerson ? <PersonPhoto person={posDetails?.assignedPerson} size="medium" hideTooltip /> : null
    }
    return (
        <SearchableDropdown
            options={positionsDropdown}
            onSelect={person => setSelectedPositionID(person.key)}
            itemComponent={ItemComponent}
            selectedComponent={SelectedComponent}
            asideComponent={AsideComponent}
        />
    )
}
