import { Button, Dialog, Typography } from '@equinor/eds-core-react'
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
}

export const SubmitFormDialog = ({ ritm, onConfirmClick }: SubmitFormDialogProps) => {
    return (
        <Dialog>
            <Dialog.Title>Order Successful !</Dialog.Title>
            <Dialog.CustomContent>
                <Typography variant="body_short">
                    The order was submitted successfully to Service Now. The RITM for your order is
                </Typography>
                <Typography variant="body_short_bold">{ritm}</Typography>
            </Dialog.CustomContent>
            <Dialog.Actions>
                <Wrapper>
                    <Button onClick={onConfirmClick}>OK</Button>
                </Wrapper>
            </Dialog.Actions>
        </Dialog>
    )
}
