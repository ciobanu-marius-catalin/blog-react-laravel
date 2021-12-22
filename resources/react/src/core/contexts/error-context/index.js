import { createContext, useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useDeepMemo } from "@/core";

const defaultContext = {
    error: "",
    setError: _.noop,
    errorCode: "",
    setErrorCode: _.noop,
};

const ErrorContext = createContext(defaultContext);

const useErrorContextValue = () => {
    const [error, setError] = useState(null);

    console.log("useErrorContext");
    useEffect(() => {
        console.log("use error context mounted");
    }, []);
    let response = _.get(error, ["response"]);
    const contextValue = useDeepMemo(() => {
        const { errorMessage, errorCode, errorsList } =
            extractMessageAndStatusFromAxiosError(response);
        return {
            error: errorMessage,
            errorsList,
            errorCode,
            setError,
        };
    }, [response]);

    return contextValue;
};

function extractMessageAndStatusFromAxiosError(response) {
    let errorCode;
    let errorMessage;
    let errorsList;
    if (response) {
        errorCode = _.get(response, "status");
        switch (errorCode) {
            case 422:
                errorMessage = _.get(response, ["data", "message"]);
                errorsList = _.get(response, ["data", "errors"], {});
                break;
            default:
                errorMessage = "Something went wrong please try again latter";
        }
    }

    return {
        errorsList,
        errorCode,
        errorMessage,
    };
}

const useErrorContext = () => {
    return useContext(ErrorContext);
};

export { ErrorContext, useErrorContext, useErrorContextValue };
