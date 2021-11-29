import { Select } from '@equinor/fusion-components'

type SelectOption = {
    title: string
    key: string
    isSelected?: boolean
    isDisabled?: boolean
}

interface Props {
    userTypeOptions: SelectOption[]
    setSelectedUserType: (newSelectedOption: string) => void
}

export const UserTypeDropdown = ({ userTypeOptions, setSelectedUserType }: Props) => {
    return <Select options={userTypeOptions} onSelect={item => setSelectedUserType(item.title)} />
}
