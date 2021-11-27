import { Route } from "react-router-dom";
import { DashboardLayout } from "../../../layouts";
const RouteWithLayout = ({
    path,
    component: Component,
    layout: Layout = DashboardLayout,
}) => {
    console.log("RouteWithLayout");
    return (
        <Route path={path}>
            <Layout>
                <Component />
            </Layout>
        </Route>
    );
};

export { RouteWithLayout };
