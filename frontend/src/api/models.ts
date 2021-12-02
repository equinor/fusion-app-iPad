import { PersonDetails } from '@equinor/fusion'

export const exClasses: string[] = ['Non EX', 'EX Zone 1', 'EX Zone 2']

export const userTypes: string[] = ['Equinor personnel', 'External hire or Contractor']

export const accessoryOptions = [
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

export type OrderForm = {
    country: string | null
    orderResponsible: string
    wbs: string
    deliveryAddress: string
    exClass: string
    deviceType: string
    userType: string
    userShortnames: string
    simType: string
    nIpads: string
    accessories: string[]
}

export const initialFormState: OrderForm = {
    exClass: '',
    country: 'Norway',
    accessories: ['Charger Plug', 'Neck Strap'],
    userType: 'Equinor personnel',
    wbs: '',
    deliveryAddress: '',
    nIpads: '',
    deviceType: 'personal',
    simType: 'wifi',
    userShortnames: '',
    orderResponsible: '',
}
