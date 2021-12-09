import { Button, Dialog, Icon, Typography } from '@equinor/eds-core-react'
import { warning_filled, warning_outlined } from '@equinor/eds-icons'
import { tokens } from '@equinor/eds-tokens'
import { Spinner } from '@equinor/fusion-components'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: grid;
    column-gap: 16px;
    grid-template-columns: repeat(2, fit-content(100%));
    justify-content: end;
    justify-self: end;
`

interface SubmitFormDialogProps {
    ritm: string
    onConfirmClick: () => void
    isLoading: boolean
}

export const SubmitFormDialog = ({ ritm, onConfirmClick, isLoading }: SubmitFormDialogProps) => {
    return (
        <>
            {isLoading ? (
                <Dialog data-testid={'submit_dialog'}>
                    <Dialog.CustomContent>
                        <Spinner primary centered />
                    </Dialog.CustomContent>
                </Dialog>
            ) : (
                <Dialog data-testid={'submit_dialog'}>
                    <Dialog.Title>Order successful!</Dialog.Title>
                    <Dialog.CustomContent>
                        <Typography variant="body_short">
                            The order was submitted successfully to Service Now. The RITM for your order is
                        </Typography>
                        <Typography variant="body_short_bold">{ritm}</Typography>
                    </Dialog.CustomContent>
                    <Dialog.Actions>
                        <Wrapper>
                            <Button onClick={onConfirmClick} data-testid={'ok_button'}>OK</Button>
                        </Wrapper>
                    </Dialog.Actions>
                </Dialog>
            )}
        </>
    )
}

const Wrapper2 = styled.div`
    display: flex;
    justify-content: end;
    align-items: center
    justify-self: end;
`
interface CountWarningDialogProps {
    count: string
    onConfirmClick: () => void
    onCancelClick: () => void
}

export const CountWarningDialog = ({ count, onConfirmClick, onCancelClick }: CountWarningDialogProps) => {
    return (
        <Dialog data-testid={'count_warning_dialog'}>
            <Dialog.Title>
                <Wrapper2>
                    <Icon data={warning_filled} size={32} color={tokens.colors.interactive.warning__resting.rgba}></Icon>
                    <Typography color="warning" style={{ marginLeft: '6px', marginTop: '7px' }}>
                        Warning!
                    </Typography>
                </Wrapper2>
            </Dialog.Title>
            <Dialog.CustomContent>
                <Typography variant="body_short">
                    <span>
                        Are you sure you want to order <strong>{count}</strong> iPads?
                    </span>
                </Typography>
            </Dialog.CustomContent>
            <Dialog.Actions>
                <Wrapper>
                    <Button onClick={onConfirmClick} data-testid={'confirm_button'} >Confirm</Button>
                    <Button onClick={onCancelClick}  data-testid={'cancel_button'} variant="ghost">
                        Cancel
                    </Button>
                </Wrapper>
            </Dialog.Actions>
        </Dialog>
    )
}
