export function getWbs() {
    return [
        {
            code: 'WBSCODE1',
            description: 'First WBS',
            activeStatusIds: ['REL', 'AALK', 'wbs1'],
            isOpenForTimeWriting: true,
        },
        {
            code: 'WBSCODE2',
            description: 'Second WBS',
            activeStatusIds: ['REL', 'AALK', 'wbs2'],
            isOpenForTimeWriting: true,
        },
        {
            code: 'WBSCODE3',
            description: 'Third WBS',
            activeStatusIds: ['REL', 'AALK', 'wbs3', 'NTWR'],
            isOpenForTimeWriting: false,
        },
    ]
}
