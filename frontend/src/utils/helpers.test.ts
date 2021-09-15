import { SearchableDropdownOption } from '@equinor/fusion-components'
import { createDropdownOptions } from './helpers'

describe('Test create dropdown function', () => {
    const list = ['First', 'Second', 'Last']
    const expectedDropdownList: SearchableDropdownOption[] = [
        {
            title: 'First',
            key: '0',
            isSelected: true,
        },
        {
            title: 'Second',
            key: '1',
            isSelected: false,
        },
        {
            title: 'Last',
            key: '2',
            isSelected: false,
        },
    ]
    const resultDropdownList = createDropdownOptions(list, 'First')
    it('Resulting dropdown list should be equal to expected', () => {
        expect(resultDropdownList).toStrictEqual(expectedDropdownList)
    })
    it('First option should be selected', () => {
        expect(resultDropdownList[0].isSelected).toBe(true)
    })
})
