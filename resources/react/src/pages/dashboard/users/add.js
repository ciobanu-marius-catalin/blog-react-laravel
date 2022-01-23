import { UsersPageForm } from "./form";

const UsersPageAdd = () => {
    console.log("edit page");
    return <UsersPageForm localApiPath="/admin/users" />;
};

export { UsersPageAdd };
