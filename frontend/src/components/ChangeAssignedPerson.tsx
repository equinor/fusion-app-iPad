import { useEffect, useState } from 'react'
import { useFusionContext, PersonDetails } from '@equinor/fusion'
import { PersonPicker, PersonCard, Spinner } from '@equinor/fusion-components'
import { FieldHeader } from './FieldHeader'
import { Button, Typography } from '@equinor/eds-core-react'
import { apiBackend } from '../api/apiClient'
import { iPad } from '../api/models'

interface Props {
    iPad: iPad | undefined
    assigneeId: string | undefined
    setIsEditOpen: (newState: boolean) => void
    displayNotification: (notification: string) => Promise<void>
}

export const ChangeAssignedPerson = ({ iPad, assigneeId, setIsEditOpen, displayNotification }: Props) => {
    const api = new apiBackend()
    const [currentAssignee, setCurrentAssignee] = useState<PersonDetails>()
    const [selectedPerson, setSelectedPerson] = useState<PersonDetails | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const context = useFusionContext()

    const getPersonAsync = async () => {
        try {
            if (assigneeId) {
                const current = await context.http.apiClients.people.getPersonDetailsAsync(assigneeId)
                setCurrentAssignee(current.data)
            }
        } catch {
            console.log('Error getting assigned person')
        }
    }

    useEffect(() => {
        getPersonAsync()
    }, [])

    const handleChangeAssignee = () => {
        if (iPad && selectedPerson) {
            setIsLoading(true)
            iPad.assignee = selectedPerson.name
            iPad.assigneeId = selectedPerson.azureUniqueId
            api.putIpad(iPad.id, iPad)
                .then(() => {
                    setIsLoading(false)
                    setIsEditOpen(false)
                    displayNotification('Assignee updated')
                })
                .catch(e => {
                    throw new Error(`Error updating assignee : ${e}`)
                })
        }
    }

    return isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Spinner primary />
            <Typography>Saving...</Typography>
        </div>
    ) : (
        <div style={{ margin: 25 }}>
            <div style={{ marginBottom: 50 }}>
                <FieldHeader headerText="Current assignee" /> <PersonCard person={currentAssignee} photoSize="medium" />
            </div>
            <div>
                <FieldHeader headerText="New assignee" />
                <PersonPicker selectedPerson={selectedPerson} onSelect={p => setSelectedPerson(p)}></PersonPicker>
            </div>
            <div style={{ marginTop: 10 }}>
                <Button
                    onClick={handleChangeAssignee}
                    disabled={assigneeId == selectedPerson?.azureUniqueId || selectedPerson == undefined}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}
