import { DashboardLayout } from "../../../layouts/dashboard";
import { UsersPage, UsersPageAdd, UsersPageEdit } from "./index";

import { generateLinkPrefixFunction } from "../../utils";

const getDashboardLink = generateLinkPrefixFunction("dashboard");

const usersRoutes = [
    {
        id: "users-edit",
        hidden: true,
        protected: true,
        component: UsersPageEdit,
        layout: DashboardLayout,
        link: getDashboardLink("/users/edit"),
    },
    {
        id: "users-add",
        hidden: true,
        protected: true,
        component: UsersPageAdd,
        layout: DashboardLayout,
        link: getDashboardLink("/users/add"),
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

export { usersRoutes };
