import { Typography } from '@equinor/eds-core-react'

interface Props {
    headerText: string
}

export const FieldHeader = ({ headerText }: Props) => {
    return (
        <Typography variant="body_short_bold" style={{ fontSize: '13px' }}>
            {headerText}
        </Typography>
    )
}
