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
            dataField: '_id',
            text: 'ID',
        },
        {
            dataField: 'username',
            text: 'Username',
        },
        {
            dataField: 'createAt',
            text: 'Create At',
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
                <PaginationProvider pagination={paginationFactory(paginationOption)}>
                    {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider keyField='id' data={userlisting} columns={columns} search>
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
            )}
        </>
    )
}

export default PortalUserListing
