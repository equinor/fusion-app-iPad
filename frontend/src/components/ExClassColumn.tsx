import { FC } from 'react'
import { DataItemProps, exClass } from '../api/models'

export const ExClassColumn: FC<DataItemProps> = ({ item }) => {
    return <>{exClass[item.exClass]}</>
}
