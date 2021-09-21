import { Icon, Tooltip } from '@equinor/eds-core-react'
import { help } from '@equinor/eds-icons'
import { tokens } from '@equinor/eds-tokens'

export const HelpIcon = (helpText: string) => {
    return (
        <Tooltip placement="right" title={helpText}>
            <Icon data={help} color={tokens.colors.interactive.primary__resting.rgba}></Icon>
        </Tooltip>
    )
}
