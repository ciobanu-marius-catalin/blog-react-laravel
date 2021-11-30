import { useEffect } from "react";
import axios from "axios";
import { rootUrl } from "@/utils";

const UsersPage = () => {
    function getUser() {
        axios
            .get(`${rootUrl}/api/user`)
            .then((response) => {
                console.log("axios response", response);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        getUser();
    }, []);
    return <h1>Users Page</h1>;
};

export { UsersPage };
