import { Grid } from '@material-ui/core'
import { SearchableDropdown, SearchableDropdownOption } from '@equinor/fusion-components'

import { HelpIcon } from './HelpIcon'

interface Props {
    userTypeOptions: SearchableDropdownOption[]
    setSelectedUserType: (newSelectedOption: string) => void
}

export const UserTypeDropdown = ({ userTypeOptions, setSelectedUserType }: Props) => {
    return (
        <Grid item container xs={12} spacing={3} alignItems="center">
            <Grid item xs={10} sm={5} data-testid={'user_type_dropdown'}>
                <SearchableDropdown label="User type" options={userTypeOptions} onSelect={item => setSelectedUserType(item.title)} />
            </Grid>
            <Grid item xs={1}>
                <HelpIcon helpText={'info text'} />
            </Grid>
        </Grid>
    )
}
