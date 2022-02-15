import { FC } from 'react'
import { DataItemProps, simType } from '../api/models'

export const SimTypeColumn: FC<DataItemProps> = ({ item }) => {
    return <>{simType[item.simType]}</>
}
