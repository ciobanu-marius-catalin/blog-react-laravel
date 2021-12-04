import { createContext } from "react";
import _ from "lodash";
const defaultContext = {
    error: "",
    apiPath: "",
    setError: _.noop,
};
const CrudContext = createContext(defaultContext);

export { CrudContext };
