import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PageLayout } from "./layouts";
import "./style.scss";

const App = () => {
    return (
        <Router>
            <PageLayout />
        </Router>
    );
};

export { App };
