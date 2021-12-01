import { Pagination, Table } from "react-bootstrap";
import _ from "lodash";
import { rootUrl, removeDuplicateSlashes } from "@/utils";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDeepMemo } from "@/core";
import { Icon } from "../icon";
import { useLocation } from "react-router-dom";
import { CrudTablePagination } from "./crud-pagination";

function CrudTable({ path, columnNames = [], perPage = 10 } = {}) {
    const [page, setPage] = useState(1);
    let { data, nrOfPages, isLoading } = useFetchedData({
        path,
        columnNames,
        page,
        perPage,
    });

    let Content;

    if (isLoading) {
        Content = LoadingTable;
    } else if (_.isEmpty(data)) {
        Content = EmptyTable;
    } else {
        Content = TableContent;
    }

    return (
        <div>
            <Table className="gravity-crud-table" striped bordered hover>
                <thead>
                    <tr>
                        {columnNames.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <Content data={data} columnNames={columnNames} />
            </Table>
            <CrudTablePagination
                activePage={page}
                setPage={setPage}
                nrOfPages={nrOfPages}
            />
        </div>
    );
}

function useFetchedData({ path, columnNames = [], perPage = 10, page = 1 }) {
    let [data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [nrOfPages, setNrOfPages] = useState(0);
    async function fetchData() {
        setIsLoading(true);
        let absolutePath = removeDuplicateSlashes(`${rootUrl}/api/${path}`);
        try {
            let fetchResult = await axios.get(absolutePath, {
                params: {
                    perPage,
                    page,
                },
            });
            let fetchedData = _.get(fetchResult, "data.data", []);

            fetchedData = fetchedData.map((data) => {
                return _.pick(data, columnNames);
            });
            if (fetchedData) {
                setData(fetchedData);
            }

            let nrOfPages = _.get(fetchResult, ["data", "nrOfPages"]);
            if (nrOfPages) {
                setNrOfPages(nrOfPages);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }

        console.log("fetch Data");
    }

    useEffect(() => {
        fetchData();
    }, [page]);
    // useEffect(() => {
    //     fetchData();
    // }, []);

    return { data, nrOfPages, isLoading };
}

function TableContent({ data, columnNames }) {
    const location = useLocation();
    let currentRouterPath = location.pathname;

    console.log("index");

    const onEdit = (item) => {
        console.log("edit", item);
    };
    const onDelete = (item) => {
        console.log("delete", item);
    };
    return (
        <tbody>
            {data.map((item) => {
                return (
                    <tr key={item.id}>
                        {columnNames.map((columnName) => (
                            <td key={item?.[columnName]}>
                                {item?.[columnName]}
                            </td>
                        ))}
                        <td className="gravity-crud-table__action-row">
                            <Icon
                                className="gravity-crud-table__icon gravity-crud-table__edit"
                                name="pencil-alt"
                                onClick={() => onEdit(item)}
                            />
                            <Icon
                                className="gravity-crud-table__icon  gravity-crud-table__delete"
                                name="trash"
                                onClick={() => onDelete(item)}
                            />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}

function EmptyTable({ columnNames = [] }) {
    return (
        <tbody>
            <tr>
                <td
                    className="gravity-crud-table__empty-column"
                    colSpan={columnNames.length}
                >
                    <div className="gravity-crud-table__empty-column__content">
                        <Icon name="meh"></Icon>
                        <span>No results found</span>
                    </div>
                </td>
            </tr>
        </tbody>
    );
}
function LoadingTable({ columnNames }) {
    return (
        <tbody>
            <tr>
                <td
                    className="gravity-crud-table__loading-column"
                    colSpan={columnNames.length}
                >
                    <div className="gravity-crud-table__loading-column__content">
                        <Icon name="spin" className="fa-spinner" />
                    </div>
                </td>
            </tr>
        </tbody>
    );
}
export { CrudTable };
