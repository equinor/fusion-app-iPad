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

export type Wbs = {
    code: string
    description: string
    activeStatusIds: string[]
    isOpenForTimeWriting: boolean
}

export type OrderForm = {
    country: string | null
    orderResponsible: string
    wbsCode: string
    deliveryAddress: string
    exClass: string
    deviceType: string
    userType: string
    userShortnames: string
    simType: string
    iPadAmount: string
    accessories: string[]
}

export const initialFormState: OrderForm = {
    exClass: exClasses[0],
    country: 'Norway',
    accessories: ['Charger Plug', 'Neck Strap'],
    userType: userTypes[0],
    wbsCode: '',
    deliveryAddress: '',
    iPadAmount: '',
    deviceType: 'personal',
    simType: 'wifi',
    userShortnames: '',
    orderResponsible: '',
}

export type iPad = {
    id: number
    yellowTag: string
    lastKnownRITM: string
    owner: string
    ownerId: string
    assignee: string
    assigneeId: string
    project: string
    projectId: string
    deliveryAddress: string
    exClass: number
    userType: number
    simType: number
    status: number
    createdAt: string
    modifiedAt: string
}

export type DataItemProps = {
    item: iPad
    rowIndex: number
}

export type ErrorProps = {
    setIsError: (newState: boolean) => void
    setErrorMessage: (newState: string) => void
}
