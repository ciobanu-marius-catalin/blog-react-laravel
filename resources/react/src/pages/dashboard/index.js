import { HomePage } from "./home";
import { UsersPage } from "./users";
import { generateLinkPrefixFunction } from "../utils";

const getDashboardLink = generateLinkPrefixFunction("dashboard");

const dashboardRoutesList = [
    {
        id: "home",
        label: "Dashboard",
        component: HomePage,
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
        component: UsersPage,
        link: getDashboardLink("/users"),
    },
];

export { dashboardRoutesList };
