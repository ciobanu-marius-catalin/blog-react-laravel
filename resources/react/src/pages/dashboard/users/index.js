import { CrudTable } from "@/components";

const UsersPage = () => {
    let columnNames = ["id", "name", "email", "role"];
    return <CrudTable localApiPath="/admin/users" columnNames={columnNames} />;
};

export * from "./edit";
export * from "./add";
export { UsersPage };
