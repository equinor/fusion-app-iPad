import { PersonDetails } from '@equinor/fusion'

export const exClasses: string[] = ['Non EX', 'EX Zone 1', 'EX Zone 2']

export const userTypes: string[] = ['Equinor personnel', 'External hire or Contractor']

export const accessories = [
    'Charger Plug',
    'Neck Strap',
    'Stylus Pen',
    'Fall Protection Folder',
    '8-port charging station incl 0,3m charge cable',
]

export type PositionDetails = {
    positionId: string
    positionName: string
    assignedPerson: PersonDetails | null
    assignedPersonName: string
}
