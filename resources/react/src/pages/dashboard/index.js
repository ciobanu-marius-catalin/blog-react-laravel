import React from "react";
import { HomePage } from "./home";
import { UsersPage } from "./users";
import { generateLinkPrefixFunction } from "../utils";
import { DashboardLayout } from "../../layouts/dashboard";
import _ from "lodash";
import { authRoutesList } from "../authentification";

const getDashboardLink = generateLinkPrefixFunction("dashboard");

const dashboardRoutesList = [
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
    {
        id: "users",
        label: "Users",
        icon: "users",
        protected: true,
        component: UsersPage,
        layout: DashboardLayout,
        link: getDashboardLink("/users"),
    },
];
const dashboardRoutesById = _.keyBy(dashboardRoutesList, "id");
console.log("dashboard layouts");

export { dashboardRoutesList, dashboardRoutesById };
