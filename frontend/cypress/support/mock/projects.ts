import * as faker from 'faker'

export class FusionProject {
    id: string
    externalId: string
    name: string

    constructor({ id, externalId, name }: { id: string; externalId: string; name: string }) {
        this.id = id
        this.externalId = externalId
        this.name = name
    }
}

export const fusionProject1 = new FusionProject({
    id: '123',
    externalId: '123',
    name: 'Banana Banana',
})

export const fusionProjects = [fusionProject1]

export function findFusionProjectByID(id: string) {
    return fusionProjects.filter(p => p.id == id)[0]
}

export function getFusionProjectData(project: FusionProject) {
    return {
        id: project.id,
        externalId: project.externalId,
        source: null,
        type: { id: 'OrgChart', isChildType: true, parentTypeIds: ['Project', 'Portfolio'] },
        value: { orgChartId: project.externalId, domainId: '', dgPhase: '' },
        title: project.name,
        isActive: faker.datatype.boolean(),
        isDeleted: faker.datatype.boolean(),
        created: '2020-09-01T20:20:00.00+00:00',
        updated: '2020-10-01T20:20:00.00+00:00',
    }
}
