import { Grid } from '@material-ui/core'
import { Icon, Tooltip } from '@equinor/eds-core-react'
import { help } from '@equinor/eds-icons'
import { tokens } from '@equinor/eds-tokens'

interface Props {
    helpText: string
}

export const HelpIcon = ({ helpText }: Props) => {
    return (
        <Grid item xs={1} style={{marginTop:'20px'}}>
            <Tooltip placement="right" title={helpText}>
                <Icon data={help} color={tokens.colors.interactive.primary__resting.rgba}></Icon>
            </Tooltip>
        </Grid>
    )
}
