import { Alert, Pagination, Table } from "react-bootstrap";
import _ from "lodash";
import { useEffect, useState, useRef, useContext } from "react";
import { useDeepMemo } from "@/core";
import { CrudContext } from "./crud-context";
import { CrudTablePagination } from "./crud-pagination";
import { useFetchedData } from "./use-fetched-data";
import { TableContent } from "./table-content";
import { EmptyTableContent } from "./empty-table-content";
import { LoadingTableContent } from "./loading-table-content";
import { apiRootUrl, removeDuplicateSlashes } from "@/utils";

function CrudTable_({ columnNames = [], perPage = 10 } = {}) {
    const [page, setPage] = useState(1);
    const { error, setError } = useContext(CrudContext);

    let { data, nrOfPages, isLoading, refreshPage } = useFetchedData({
        columnNames,
        page,
        perPage,
    });

    let Content;
    console.log("crud page index");
    //remove errors on page change
    useEffect(() => {
        if (error) {
            setError(null);
        }
    }, [page]);

    if (isLoading) {
        Content = LoadingTableContent;
    } else if (_.isEmpty(data)) {
        Content = EmptyTableContent;
    } else {
        Content = TableContent;
    }

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
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
    const [error, setError] = useState(null);
    const contextValue = useDeepMemo(() => {
        let apiPath = removeDuplicateSlashes(`${apiRootUrl}/${localApiPath}`);
        return {
            apiPath,
            error,
            setError,
        };
    }, [localApiPath, error, setError]);

    return (
        <CrudContext.Provider value={contextValue}>
            <CrudTable_ {...props} />
        </CrudContext.Provider>
    );
}

export { CrudTable };
