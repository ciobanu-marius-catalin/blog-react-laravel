import React from "react";
import { HomePage } from "./home";
import { generateLinkPrefixFunction } from "../utils";
import { DashboardLayout } from "../../layouts/dashboard";
import _ from "lodash";

import { postsRoutes } from "./posts/routes";
import { usersRoutes } from "./users/routes";

const getDashboardLink = generateLinkPrefixFunction("dashboard");

let dashboardRoutesList = [
    {
        id: "home",
        label: "Dashboard",
        component: HomePage,
        layout: DashboardLayout,
        protected: true,
        link: getDashboardLink("/"),
        icon: "desktop",
        routeProps: {
            exact: true,
        },
    },
];
dashboardRoutesList = dashboardRoutesList.concat(usersRoutes, postsRoutes);

const dashboardRoutesById = _.keyBy(dashboardRoutesList, "id");
console.log("dashboard layouts");

export { dashboardRoutesList, dashboardRoutesById, getDashboardLink };
