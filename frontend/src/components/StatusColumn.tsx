import { FC } from 'react'
import { DataItemProps, status } from '../api/models'

export const StatusColumn: FC<DataItemProps> = ({ item }) => {
    return <>{status[item.status]}</>
}
