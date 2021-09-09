import { useState } from 'react';
import { SearchableDropdown, SearchableDropdownOption, TextInput } from '@equinor/fusion-components';
import { Radio, Button, EdsProvider } from '@equinor/eds-core-react'
import { Grid } from '@material-ui/core';

const Order = () => {
    const dropdownDummy = [
        {
            key: '1',
            title: 'First option'
        },
        {
            key: '2',
            title: 'Second option'
        },
        {
            key: '3',
            title: 'Last option'
        }
    ]

    const exClass = [
        {
            key: '1',
            title: 'Non-EX'
        },
        {
            key: '2',
            title: 'EX Zone 1'
        },
        {
            key: '3',
            title: 'EX Zone 2'
        }
    ]

    const userType = [
        {
            key: '1',
            title: 'Equinor personnel',
            isSelected: true,
        },
        {
            key: '2',
            title: 'External hire or Contractor'

        }
    ]

    const [options, setOptions] = useState<SearchableDropdownOption[]>(dropdownDummy)
    const [exClassOptions, setExClassOptions] = useState<SearchableDropdownOption[]>(exClass)
    const [userTypeOptions, setUserTypeOptions] = useState<SearchableDropdownOption[]>(userType)
    const [wbs, setWbs] = useState('');
    const [address, setAddress] = useState('');
    const [ipadCount, setIpadCount] = useState('');
    const [radioChecked, setRadioChecked] = useState('personal')
    const [radioCheckedSIM, setRadioCheckedSIM] = useState('wifi')
    const [shortname, setShortname] = useState('')

    const updateOptions = (item: { key: string }, options: SearchableDropdownOption[]) =>
        options.map((option) => {
            return { ...option, isSelected: item.key === option.key };
        })

    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <SearchableDropdown
                        label='Project'
                        options={options}
                        onSelect={(item) => setOptions(updateOptions(item, options))}
                    />
                </Grid>
                <Grid item xs={6}>
                    <SearchableDropdown
                        label='Country'
                        options={options}
                        onSelect={(item) => setOptions(updateOptions(item, options))}
                    />
                </Grid>
            </Grid>
            <Grid item sm={6}>
                <SearchableDropdown
                    label='Ordering on behalf of'
                    options={options}
                    onSelect={(item) => setOptions(updateOptions(item, options))}
                />
            </Grid>
            <Grid item xs={6}>
                <TextInput
                    label='Project wbs'
                    value={wbs}
                    onChange={(value) => { setWbs(value) }}
                />
            </Grid>
            <Grid item sm={6}>
                <TextInput
                    label='Delivery address'
                    value={address}
                    onChange={(value) => { setAddress(value) }}
                />
            </Grid>
            <Grid item xs={6}>
                <SearchableDropdown
                    label='EX classification'
                    options={exClassOptions}
                    onSelect={(item) => setExClassOptions(updateOptions(item, exClassOptions))}
                />
            </Grid>
            <Radio
                label='Personal device'
                value='personal'
                checked={radioChecked === 'personal'}
                onChange={() => { setRadioChecked('personal') }}
            />
            <Radio
                label='Multi-user device'
                value='multi'
                checked={radioChecked === 'multi'}
                onChange={() => { setRadioChecked('multi') }}
            />
            <Grid item xs={6}>
                <SearchableDropdown
                    label='User type'

                    options={userTypeOptions}
                    onSelect={(item) => setUserTypeOptions(updateOptions(item, userTypeOptions))}
                />
            </Grid>
            <Radio
                label='No, WIFI only'
                value='wifi'
                checked={radioCheckedSIM === 'wifi'}
                onChange={() => { setRadioCheckedSIM('wifi') }}
            />
            <Radio
                label='Yes, SIM with 4G'
                value='sim'
                checked={radioCheckedSIM === 'sim'}
                onChange={() => { setRadioCheckedSIM('sim') }}
            />
            <Grid item xs={6}>
                <TextInput
                    label='Number of iPads'
                    value={ipadCount}
                    onChange={(value) => { setIpadCount(value) }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextInput
                    label='Shortname users'
                    value={shortname}
                    onChange={(value) => { setShortname(value) }}
                />
            </Grid>
            <EdsProvider density="compact">
                <Button variant="outlined" href='/'> Cancel </Button>
                <Button> Create </Button>
            </EdsProvider>
        </div>

    );
}


export default Order;
