import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { Icon } from "../icon";
import { DeleteModal } from "./delete-modal";
import { useCrudContext } from "./crud-context";
import { apiRootUrl, removeDuplicateSlashes } from "@/utils";
import { useHistory } from "react-router-dom";
import { useErrorContext } from "@/core";

function TableContent({ data, columnNames, refreshPage } = {}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModalItem, setDeleteModalItem] = useState(null);
    const { apiPath } = useCrudContext();
    const { setError } = useErrorContext();
    const location = useLocation();
    let currentRouterPath = location.pathname;
    const history = useHistory();
    console.log("index");

    const onEdit = (item) => {
        console.log("edit", item);
        const id = item?.id;

        //let editRoute =   '/dashboard/user/edit'
        let editRoute = `${currentRouterPath}/edit`;
        history.push({
            pathname: editRoute,
            search: `?id=${id}`, // query string
            state: {
                // location state
                update: true,
            },
        });
        // history.push(editRoute);
    };

    const onDelete = (item) => {
        setDeleteModalItem(item);
        setShowDeleteModal(true);
    };
    const onDeleteItem = async () => {
        const item = deleteModalItem;

        const path = removeDuplicateSlashes(`${apiPath}/${item?.id}`);
        try {
            await axios.delete(path);
            refreshPage();
        } catch (e) {
            setError("Could not delete the entry, please try again later");
            console.error(e.message);
        } finally {
            setShowDeleteModal(false);
        }

        console.log("delete", item);
    };
    const onCancelDelete = () => {
        setShowDeleteModal(false);
    };
    return (
        <>
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
            <DeleteModal
                show={showDeleteModal}
                onCancel={onCancelDelete}
                onDelete={onDeleteItem}
            />
        </>
    );
}

export { TableContent };
