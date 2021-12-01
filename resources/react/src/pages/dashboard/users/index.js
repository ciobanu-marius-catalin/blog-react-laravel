import { CrudTable } from "@/components";

const UsersPage = () => {
    let columnNames = ["id", "name", "email", "role"];
    return <CrudTable path="/users" columnNames={columnNames} />;
};

export { UsersPage };
