import { Alert, Button, Pagination, Table } from "react-bootstrap";
import _ from "lodash";
import { useEffect, useState, useRef, useContext } from "react";
import { CrudContext, useCrudContextValue } from "./crud-context";
import { CrudTablePagination } from "./crud-pagination";
import { useFetchedData } from "./use-fetched-data";
import { TableContent } from "./table-content";
import { EmptyTableContent } from "./empty-table-content";
import { LoadingTableContent } from "./loading-table-content";
import { useHistory, useLocation } from "react-router-dom";
import { useErrorContext } from "@/core";

function CrudTable_({ columnNames = [], perPage = 10 } = {}) {
    const [page, setPage] = useState(1);
    const { error } = useErrorContext();
    let { data, nrOfPages, isLoading, refreshPage } = useFetchedData({
        columnNames,
        page,
        perPage,
    });

    let Content;
    console.log("crud page index");

    if (isLoading) {
        Content = LoadingTableContent;
    } else if (_.isEmpty(data)) {
        Content = EmptyTableContent;
    } else {
        Content = TableContent;
    }

    return (
        <>
            {error && (
                <Alert className="w-100" variant="danger">
                    {error}
                </Alert>
            )}
            <Table className="gravity-crud-table" striped bordered hover>
                <thead>
                    <tr>
                        {columnNames.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <Content
                    data={data}
                    columnNames={columnNames}
                    refreshPage={refreshPage}
                />
            </Table>
            <CrudTablePagination
                activePage={page}
                setPage={setPage}
                nrOfPages={nrOfPages}
            />
        </>
    );
}

function CrudTable(props = {}) {
    const { localApiPath } = props;

    const contextValue = useCrudContextValue(localApiPath);

    const location = useLocation();
    let currentRouterPath = location.pathname;
    const history = useHistory();
    const onAdd = () => {
        //let editRoute =   '/dashboard/user/edit'
        let addRoute = `${currentRouterPath}/add`;
        history.push(addRoute);
    };
    return (
        <CrudContext.Provider value={contextValue}>
            <div className="gravity-crud-table__container">
                <Button
                    className="gravity-crud-table__add-button"
                    onClick={onAdd}
                >
                    Add item
                </Button>
                <CrudTable_ {...props} />
            </div>
        </CrudContext.Provider>
    );
}

export * from "./form";
export * from "./edit-page";
export { CrudTable };
