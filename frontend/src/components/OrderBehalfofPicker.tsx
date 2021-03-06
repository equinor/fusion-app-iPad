import { PersonPhoto, SearchableDropdown, SearchableDropdownOption, Spinner } from '@equinor/fusion-components'
import { OrderForm, PositionDetails } from '../api/models'

interface Props {
    positionOptions: SearchableDropdownOption[]
    positions: PositionDetails[]
    setSingleField: (name: string, value: any) => void
}

export const OrderBehalfofPicker = ({ positionOptions, positions, setSingleField }: Props) => {
    const ItemComponent = (item: any) => {
        if (item.item) {
            if (item.item.key === 'empty' || item.item.key === 'loading') {
                return <div>{item.item.title}</div>
            }
            const posDetails = positions.find(p => p.positionId === item.item.key)
            return (
                <div>
                    <strong> {posDetails?.assignedPersonName} </strong> <br />
                    {posDetails?.positionName}
                </div>
            )
        }
        return null
    }

    const SelectedComponent = (item: any) => {
        if (item.item) {
            if (item.item.key === 'empty' || item.item.key === 'loading') {
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
        if (item.item.key == 'loading') {
            return (
                <div style={{ marginTop: '10px', marginRight: '20px' }}>
                    <Spinner primary small />
                </div>
            )
        } else {
            return posDetails?.assignedPerson ? <PersonPhoto person={posDetails?.assignedPerson} size="medium" hideTooltip /> : null
        }
    }
    return (
        <SearchableDropdown
            options={positionOptions}
            onSelect={person => setSingleField('orderResponsible', person.key)}
            itemComponent={ItemComponent}
            selectedComponent={SelectedComponent}
            asideComponent={AsideComponent}
        />
    )
}
