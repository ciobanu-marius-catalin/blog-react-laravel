import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./style.scss";
import { RouteWithLayout, ProtectedRoute } from "./components";
import { routesList } from "./pages";
import _ from "lodash";
import { store, useNamespacedDispatch, USER_MODULE } from "@/store";
import { Provider } from "react-redux";

const App = () => {
    return (
        <Provider store={store}>
            <RouteApp />
            <DataInitialization />
        </Provider>
    );
};

function RouteApp() {
    return (
        <Router>
            <Switch>
                {routesList.map((route) => {
                    const routeProps = _.get(route, "routeProps", {});
                    const Route = route?.protected
                        ? ProtectedRoute
                        : RouteWithLayout;
                    return (
                        <Route
                            key={route?.link}
                            path={route?.link}
                            component={route?.component}
                            layout={route?.layout}
                            {...routeProps}
                        />
                    );
                })}
            </Switch>
        </Router>
    );
}
function DataInitialization() {
    console.log("data initizliation");
    const { init } = useNamespacedDispatch(USER_MODULE);
    useEffect(() => {
        init();
    }, []);
    return <></>;
}

export { App };
