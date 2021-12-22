import { Route } from "react-router-dom";
import { DashboardLayout } from "../../../layouts";
import { useErrorContextValue, ErrorContext } from "@/core";

const RouteWithLayout = ({
    path,
    component: Component,
    layout: Layout = DashboardLayout,
}) => {
    console.log("RouteWithLayout");
    const contextValue = useErrorContextValue();
    return (
        <Route path={path}>
            <Layout>
                <ErrorContext.Provider value={contextValue}>
                    <Component />
                </ErrorContext.Provider>
            </Layout>
        </Route>
    );
};

export { RouteWithLayout };
