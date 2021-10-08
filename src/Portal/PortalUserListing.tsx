import { UserContext } from 'contexts/UserContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator'
import moment from 'moment'

const { SearchBar } = Search

const PortalUserListing = () => {
    const {
        userState: { userlisting, userListingLoading, totalPages, currentPage, total },
        getUsers,
    } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])

    const columns = [
        {
            dataField: 'username',
            text: 'Username',
        },
        {
            dataField: 'roles',
            text: 'Roles',
        },
        {
            dataField: 'createAt',
            text: 'Create At',
            formatter: (cell: string) => {
                return <>{moment(cell).format('DD MMM yyyy hh:mm:ss')}</>
            },
        },
    ]

    const paginationOption = {
        // custom: true,
        totalSize: userlisting.length,
        sizePerPage: 5,
    }

    return (
        <>
            {userlisting && (
                <div className='col-md-12 mt-3'>
                    <PaginationProvider pagination={paginationFactory(paginationOption)}>
                        {({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                                keyField='id'
                                data={userlisting}
                                columns={columns}
                                search
                            >
                                {(props) => (
                                    <div>
                                        <p>Search:</p>
                                        <SearchBar {...props.searchProps} />
                                        <hr />
                                        <BootstrapTable
                                            {...props.baseProps}
                                            {...paginationTableProps}
                                        />
                                    </div>
                                )}
                            </ToolkitProvider>
                        )}
                    </PaginationProvider>
                </div>
            )}
        </>
    )
}

export default PortalUserListing
