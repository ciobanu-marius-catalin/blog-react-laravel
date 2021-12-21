import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./style.scss";
import { RouteWithLayout, ProtectedRoute } from "./components";
import { routesList } from "./pages";
import _ from "lodash";
import { store, useNamespacedDispatch, USER_MODULE } from "@/store";
import { Provider } from "react-redux";
import { initHeaders } from "@/core";

const App = () => {
    const [dataInitialized, setDataInitialized] = useState(false);

    return (
        <Provider store={store}>
            <DataInitialization
                dataInitialized={dataInitialized}
                setDataInitialized={setDataInitialized}
            />
            {dataInitialized && <RouteApp />}
        </Provider>
    );
};

function RouteApp() {
    console.log("route app");
    return (
        <Router>
            <Switch>
                {routesList.map((route) => {
                    const routeProps = _.get(route, "routeProps", {});
                    const Route = route?.protected
                        ? ProtectedRoute
                        : RouteWithLayout;
                    let optionalParameters = {};

                    return (
                        <Route
                            key={route?.link}
                            path={route?.link}
                            component={route?.component}
                            layout={route?.layout}
                            {...optionalParameters}
                            {...routeProps}
                        />
                    );
                })}
            </Switch>
        </Router>
    );
}
function DataInitialization({ dataInitialized, setDataInitialized }) {
    const { init } = useNamespacedDispatch(USER_MODULE);
    useEffect(() => {
        const initUser = async () => {
            await init();
        };

        const initData = async () => {
            await initHeaders();
            await initUser();
            setDataInitialized(true);
        };
        if (!dataInitialized) {
            initData();
        }
    }, []);
    return <></>;
}

export { App };
