import { useDebouncedAbortable } from '@equinor/fusion'
import { SearchableDropdown } from '@equinor/fusion-components'
import { useCallback, useEffect, useState } from 'react'
import { apiBackend } from '../api/apiClient'
import { Wbs, ErrorProps } from '../api/models'
import { createDropdownOptionsFromWbs, loadingAsideComponent } from '../utils/helpers'
import { useFetchWbs } from '../utils/hooks'

interface Props {
    wbsCode: string
    setSingleField: (name: string, value: any) => void
    errorProps: ErrorProps
}

export const WbsPicker = ({ wbsCode, setSingleField, errorProps }: Props) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isQuerying, setIsQuerying] = useState(false)
    const [wbsList, setWbsList] = useState<Wbs[]>([])
    const validLength = (searchQuery: string) => {
        return searchQuery.length > 4
    }
    const list = createDropdownOptionsFromWbs(wbsList, wbsCode, isQuerying, searchQuery, validLength)

    const canQuery = (searchQuery: string) => !!searchQuery && validLength(searchQuery)

    const fetchWbs = useFetchWbs(canQuery, setIsQuerying, setWbsList, errorProps)

    useEffect(() => {
        if (canQuery(searchQuery)) {
            setIsQuerying(true)
        }
    }, [searchQuery])

    useDebouncedAbortable(fetchWbs, searchQuery)

    const ItemComponent = (item: any) => {
        if (item.item) {
            if (item.item.key === 'empty' || item.item.key === 'loading' || item.item.key === 'typing') {
                return <div>{item.item.title}</div>
            }
            const wbsDetails = wbsList.find(wbs => wbs.code === item.item.key)
            return (
                <div>
                    <strong>{wbsDetails?.code} </strong>
                    <br />
                    {wbsDetails?.description}
                </div>
            )
        }
        return null
    }

    const selectedComponent = (item: any) => {
        const disabledComponentKeys = ['empty', 'loading', 'typing']
        if (item.item) {
            if (disabledComponentKeys.includes(item.item.key)) {
                return <div>{item.item.title}</div>
            }
            const wbsDetails = wbsList.find(wbs => wbs.code === item.item.key)
            return (
                <div>
                    {wbsDetails?.code} <br />
                    {wbsDetails?.description}
                </div>
            )
        }
        return null
    }

    return (
        <SearchableDropdown
            options={list}
            onSelect={wbs => setSingleField('wbsCode', wbs.key)}
            onSearchAsync={setSearchQuery}
            itemComponent={ItemComponent}
            selectedComponent={selectedComponent}
            asideComponent={loadingAsideComponent}
        />
    )
}
