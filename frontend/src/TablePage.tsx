import { FC, useCallback, useState } from 'react'
import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react'
import { assignment_return, edit, more_vertical, person, report } from '@equinor/eds-icons'
import { useAsyncPagination, Pagination, Page } from '@equinor/fusion'
import { DataTable, DataTableColumn, ModalSideSheet, styling } from '@equinor/fusion-components'

import { apiBackend } from './api/apiClient'
import { iPad, DataItemProps } from './api/models'
import Order from './Order'

const TablePage = () => {
    const pageSize = 10
    const api = new apiBackend()
    const [selectedIpad, setSelectedIpad] = useState<iPad>()

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isChangeOwnerOpen, setIsChangeOwnerOpen] = useState(false)
    const [isReportDamageOpen, setIsReportDamageOpen] = useState(false)
    const [isReturnOpen, setIsReturnOpen] = useState(false)
    const [isOrderIpadOpen, setIsOrderIpadOpen] = useState(false)

    const { isFetching, pagination, pagedData, setCurrentPage } = useAsyncPagination(
        async (pagination: Pagination) => await api.getIpads(pagination.currentPage.index + 1, pageSize),
        pageSize
    )
    const onPaginationChange = useCallback((newPage: Page, perPage: number) => {
        setCurrentPage(newPage.index, perPage)
    }, [])

    const editIpadEntryButton: FC<DataItemProps> = ({ item }) => {
        const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
        const [element, setElement] = useState<HTMLButtonElement>()
        const handleOnClick = (target: any) => {
            setElement(target)
            setIsMenuOpen(!isMenuOpen)
        }
        return (
            <>
                <Button
                    variant="ghost_icon"
                    onClick={e => handleOnClick(e.target)}
                    id="editIpadEntry"
                    aria-controls="menu-editIpadEntry"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                >
                    <Icon data={more_vertical}></Icon>
                </Button>
                <Menu
                    open={isMenuOpen}
                    anchorEl={element}
                    onClose={() => setIsMenuOpen(false)}
                    id="menu-editIpadEntry"
                    aria-labelledby="editIpadEntry"
                >
                    <Menu.Item
                        onClick={() => {
                            setSelectedIpad(item)
                            setIsEditOpen(true)
                        }}
                    >
                        <Icon data={edit} />
                        <Typography>Edit</Typography>
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            setSelectedIpad(item)
                            setIsChangeOwnerOpen(true)
                        }}
                    >
                        <Icon data={person} />
                        <Typography>Change owner</Typography>
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            setSelectedIpad(item)
                            setIsReportDamageOpen(true)
                        }}
                    >
                        <Icon data={report} />
                        <Typography>Report damage</Typography>
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            setSelectedIpad(item)
                            setIsReturnOpen(true)
                        }}
                    >
                        <Icon data={assignment_return} />
                        <Typography>Return iPad</Typography>
                    </Menu.Item>
                </Menu>
            </>
        )
    }

    const columns: DataTableColumn<iPad>[] = [
        {
            key: 'id',
            accessor: 'id',
            label: 'ID',
        },
        {
            key: 'yellowTag',
            accessor: 'yellowTag',
            label: 'Yellow Tag',
        },
        {
            key: 'RITM',
            accessor: 'lastKnownRITM',
            label: 'RITM',
        },
        {
            key: 'owner',
            accessor: 'owner',
            label: 'Owner',
        },
        {
            key: 'assignee',
            accessor: 'assignee',
            label: 'Assignee',
        },
        {
            key: 'project',
            accessor: 'project',
            label: 'Project',
        },
        {
            key: 'exClass',
            accessor: 'exClass',
            label: 'EX-Type',
        },
        {
            key: 'simType',
            accessor: 'simType',
            label: 'SIM-Type',
        },
        {
            key: 'status',
            accessor: 'status',
            label: 'Status',
        },
        {
            key: 'edit',
            accessor: 'id',
            label: '',
            width: styling.grid(1),
            style: { justifyContent: 'flex-end' },
            component: editIpadEntryButton,
        },
    ]

    return (
        <div
            style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                display: 'flex',
                margin: '20px',
                flexDirection: 'column',
            }}
        >
            <ModalSideSheet
                header="Edit iPad entry"
                show={isEditOpen}
                onClose={() => {
                    setIsEditOpen(false)
                }}
            >
                <>Edit iPad with id {selectedIpad?.id}</>
            </ModalSideSheet>
            <ModalSideSheet
                header="Change iPad owner"
                show={isChangeOwnerOpen}
                onClose={() => {
                    setIsChangeOwnerOpen(false)
                }}
            >
                <>
                    Change owner of iPad with id {selectedIpad?.id}. Current owner is {selectedIpad?.owner}
                </>
            </ModalSideSheet>
            <ModalSideSheet
                header="Report iPad damage"
                show={isReportDamageOpen}
                onClose={() => {
                    setIsReportDamageOpen(false)
                }}
            >
                <>Report damage on iPad with id {selectedIpad?.id}</>
            </ModalSideSheet>
            <ModalSideSheet
                header="Return iPad"
                show={isReturnOpen}
                onClose={() => {
                    setIsReturnOpen(false)
                }}
            >
                <>Return iPad with id {selectedIpad?.id}</>
            </ModalSideSheet>
            <ModalSideSheet
                header="Order iPad"
                show={isOrderIpadOpen}
                onClose={() => {
                    setIsOrderIpadOpen(false)
                }}
            >
                <Order />
            </ModalSideSheet>
            <Button onClick={() => setIsOrderIpadOpen(true)}>Order iPad</Button>
            <DataTable
                columns={columns}
                data={pagedData}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
                isFetching={isFetching}
                rowIdentifier={'id'}
            ></DataTable>
        </div>
    )
}

export default TablePage
