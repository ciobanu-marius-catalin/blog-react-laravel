import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./style.scss";
import { RouteWithLayout } from "./components";
import { routesList } from "./pages";

const App = () => {
    console.log("app", routesList);
    return (
        <Router>
            <Switch>
                {routesList.map((route) => {
                    const routeProps = _.get(route, "routeProps", {});
                    return (
                        <RouteWithLayout
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
};

export { App };
