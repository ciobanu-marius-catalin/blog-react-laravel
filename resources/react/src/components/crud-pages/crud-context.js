import { createContext, useContext, useState } from "react";
import _ from "lodash";
import { useDeepMemo } from "@/core";
import { apiRootUrl, removeDuplicateSlashes } from "@/utils";

const defaultContext = {
    apiPath: "",
};

const CrudContext = createContext(defaultContext);

const useCrudContextValue = (localApiPath) => {
    const contextValue = useDeepMemo(() => {
        let apiPath = removeDuplicateSlashes(`${apiRootUrl}/${localApiPath}`);
        return {
            apiPath,
        };
    }, [localApiPath]);

    return contextValue;
};
const useCrudContext = () => {
    return useContext(CrudContext);
};
export { CrudContext, useCrudContext, useCrudContextValue };
