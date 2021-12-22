import { UsersPageForm, settings } from "./form";
import { useLocation } from "react-router-dom";

const editColumns = ["name", "email"];

const editSettings = settings.filter((item) =>
    editColumns.includes(item?.setting)
);

const UsersPageEdit = () => {
    console.log("edit page");
    const location = useLocation();
    let search = location.search;
    let id;
    try {
        const urlSearchParams = new URLSearchParams(search);
        id = urlSearchParams.get("id");
    } catch (e) {}

    let localApiPath = `/users/${id}`;
    return (
        <UsersPageForm
            settings={editSettings}
            localApiPath={localApiPath}
            loadData={true}
            method={"put"}
        />
    );
};

export { UsersPageEdit };
