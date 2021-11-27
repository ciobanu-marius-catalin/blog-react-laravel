import { useEffect } from "react";

const UsersPage = () => {
    useEffect(() => {
        throw new Error("Let it burn");
    }, []);
    return <h1>Users Page</h1>;
};

export { UsersPage };
