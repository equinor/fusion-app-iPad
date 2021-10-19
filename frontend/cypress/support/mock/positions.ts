import { User, users } from './users'

export class FusionPosition {
    id: string
    name: string
    assignedPerson: User

    constructor({ id, name, assignedPerson }: { id: string; name: string; assignedPerson: User }) {
        this.id = id
        this.name = name
        this.assignedPerson = assignedPerson
    }
}

export const fusionPosition1 = new FusionPosition({
    id: '123',
    name: 'CC Manager',
    assignedPerson: users[0],
})

export const fusionPositions = [fusionPosition1]

export function findFusionPositionByID(id: string) {
    return fusionPositions.filter(p => p.id == id)[0]
}

export function getFusionPositionData(position: FusionPosition) {
    return [
        {
            id: position.id,
            basePosition: { department: 'abc', dicipline: 'CC', id: '123', name: 'baseName', projectType: 'ABC', subDiscipline: null },
            contractId: null,
            externalId: '123123',
            instances: [
                {
                    appliesFrom: '2021-01-01T00:00:00',
                    appliesTo: '2027-03-31T00:00:00',
                    assignedPerson: position.assignedPerson,
                    calendar: 'Normal 7,5t',
                    externalId: '123123',
                    id: '123',
                    isPrimary: false,
                    location: { code: '', country: 'Norway', id: '123', name: 'Bergen' },
                    obs: 'UPP',
                    parentPositionId: '123123',
                    positionId: '123',
                    properties: { hasRequest: false, workPackId: null },
                    rotationId: null,
                    taskOwnerIds: [],
                    type: 'Normal',
                    workload: 100,
                },
            ],
            isTaskOwner: false,
            name: position.name,
            projectId: '123',
            properties: {
                hideInTree: false,
                isSupport: false,
            },
        },
    ]
}
