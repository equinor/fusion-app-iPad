import { PersonPhoto, SearchableDropdown, SearchableDropdownOption } from '@equinor/fusion-components'
import { PositionDetails } from '../api/models'

interface Props {
    positionOptions: SearchableDropdownOption[]
    positions: PositionDetails[]
    setSelectedPositionID: (newSelectedId: string) => void
}

export const OrderBehalfofPicker = ({ positionOptions, positions, setSelectedPositionID }: Props) => {
    const ItemComponent = (item: any) => {
        if (item.item) {
            if (item.item.key === 'empty' || item.item.key === 'searching') {
                return <div>{item.item.title}</div>
            }
            const posDetails = positions.find(p => p.positionId === item.item.key)
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
        const posDetails = positions.find(e => e.positionId === item.item.key)

        return posDetails?.assignedPerson ? <PersonPhoto person={posDetails?.assignedPerson} size="medium" hideTooltip /> : null
    }
    return (
        <SearchableDropdown
            options={positionOptions}
            onSelect={person => setSelectedPositionID(person.key)}
            itemComponent={ItemComponent}
            selectedComponent={ItemComponent}
            asideComponent={AsideComponent}
        />
    )
}
