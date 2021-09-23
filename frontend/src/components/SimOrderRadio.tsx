import { Radio } from "@equinor/eds-core-react"
import { Grid } from "@material-ui/core"

interface Props {
    radioCheckedSIM: string
    setRadioCheckedSIM: (newRadioValue: string) => void
}

export const SimOrderRadio = ({ radioCheckedSIM, setRadioCheckedSIM }: Props) => {
    return (
        <>
            <Grid item xs={4}>
                Due to tax regulations, Equinor can not supply personal SIM subscriptions for any external personnel. We
                have a procedure for this, and PDC Device Service will be in contact to solve this with the relevant
                staffing agency or with your contractor.
                <br />
                <br /> Do you want the contractor to order SIM?
            </Grid>
            <Grid container xs={6}>
                <Grid item xs={3}>
                    <Radio
                        label="No, WIFI only"
                        value="wifi"
                        checked={radioCheckedSIM === 'wifi'}
                        onChange={() => {
                            setRadioCheckedSIM('wifi')
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Radio
                        label="Yes, SIM with 4G"
                        value="sim"
                        checked={radioCheckedSIM === 'sim'}
                        onChange={() => {
                            setRadioCheckedSIM('sim')
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
