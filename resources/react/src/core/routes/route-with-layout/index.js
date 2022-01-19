import { Route } from "react-router-dom";
import { DashboardLayout } from "../../../layouts";
import { useErrorContextValue, ErrorContext } from "@/core";
import { ErrorHandler } from "@/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ErrorPage } from "../../../pages/system/error-page";

const RouteWithLayout = ({
    path,
    component: Component,
    layout: Layout = DashboardLayout,
}) => {
    console.log("RouteWithLayout");
    const [showErrorPage, setShowErrorPage] = useState(false);
    let history = useHistory();
    const contextValue = useErrorContextValue();

    useEffect(() => {
        let errorCode = contextValue?.errorCode;
        switch (errorCode) {
            case 404:
                history.push("/home");
                break;
            case 401:
                history.push("/login");
                break;
            case 500:
                setShowErrorPage(true);
                break;
        }
    }, [contextValue?.errorCode]);

    if (showErrorPage) {
        Component = ErrorPage;
    }

    return (
        <Route path={path}>
            <Layout>
                <ErrorContext.Provider value={contextValue}>
                    <ErrorHandler>
                        <Component />
                    </ErrorHandler>
                </ErrorContext.Provider>
            </Layout>
        </Route>
    );
};

export { RouteWithLayout };
