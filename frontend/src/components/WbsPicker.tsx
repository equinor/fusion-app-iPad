import { useDebouncedAbortable } from '@equinor/fusion'
import { SearchableDropdown } from '@equinor/fusion-components'
import { useCallback, useEffect, useState } from 'react'
import { apiBackend } from '../api/apiClient'
import { Wbs, ErrorProps } from '../api/models'
import { createDropdownOptionsFromWbs } from '../utils/helpers'

interface Props {
    wbsCode: string
    setSingleField: (name: string, value: any) => void
    errorProps: ErrorProps
}

export const WbsPicker = ({ wbsCode, setSingleField, errorProps }: Props) => {
    const api = new apiBackend()
    const [searchQuery, setSearchQuery] = useState('')
    const [isQuerying, setIsQuerying] = useState(false)
    const [wbsList, setWbsList] = useState<Wbs[]>([])
    const validLength = (searchQuery: string) => {
        return searchQuery.length > 4
    }
    const list = createDropdownOptionsFromWbs(wbsList, wbsCode, isQuerying, searchQuery, validLength)

    const fetchWbs = useCallback(async (query: string) => {
        if (canQuery(query)) {
            try {
                const response = await api.getWbs(query)
                setWbsList(response)
                setIsQuerying(false)
            } catch (e) {
                console.log('Error fetching WBS list')
                if (e instanceof Error) {
                    errorProps.setErrorMessage(e.message)
                    errorProps.setIsError(true)
                }
                setIsQuerying(false)
                setWbsList([])
            }
        }
    }, [])

    const canQuery = (searchQuery: string) => !!searchQuery && validLength(searchQuery)

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
        />
    )
}
