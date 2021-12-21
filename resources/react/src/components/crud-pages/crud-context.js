import { createContext, useState } from "react";
import _ from "lodash";
import { useDeepMemo } from "@/core";
import { apiRootUrl, removeDuplicateSlashes } from "@/utils";


const defaultContext = {
    error: "",
    apiPath: "",
    setError: _.noop,
};

const CrudContext = createContext(defaultContext);

const useCrudContext = (localApiPath) => {
    const [error, setError] = useState(null);
    const contextValue = useDeepMemo(() => {
        let apiPath = removeDuplicateSlashes(`${apiRootUrl}/${localApiPath}`);
        return {
            apiPath,
            error,
            setError,
        };
    }, [localApiPath, error, setError]);

    return contextValue
}

export { CrudContext, useCrudContext };
