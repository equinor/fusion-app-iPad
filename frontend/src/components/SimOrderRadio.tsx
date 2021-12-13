import { Radio } from '@equinor/eds-core-react'
import { Grid } from '@material-ui/core'
import { OrderForm } from '../api/models'

interface Props {
    radioCheckedSIM: string
    setSingleField: (name: string, value: any) => void
}

export const SimOrderRadio = ({ radioCheckedSIM, setSingleField }: Props) => {
    return (
        <>
            <Grid item xs={10} sm={5}>
                Due to tax regulations, Equinor can not supply personal SIM subscriptions for any external personnel. We have a procedure
                for this, and PDC Device Service will be in contact to solve this with the relevant staffing agency or with your contractor.
                <br />
                <br /> Do you want the contractor to order SIM?
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={10} sm={3} data-testid={'wifi_radio_button'}>
                    <Radio
                        label="No, WIFI only"
                        value="wifi"
                        checked={radioCheckedSIM === 'wifi'}
                        onChange={() => {
                            setSingleField('simType', 'wifi')
                        }}
                    />
                </Grid>
                <Grid item xs={10} sm={3} data-testid={'4g_radio_button'}>
                    <Radio
                        label="Yes, SIM with 4G"
                        value="sim"
                        checked={radioCheckedSIM === 'sim'}
                        onChange={() => {
                            setSingleField('simType', 'sim')
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
