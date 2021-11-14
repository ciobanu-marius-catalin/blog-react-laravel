import { HomePage } from "./home";
import { UsersPage } from "./users";

const baseLink = "dashboard";

const getDashboardLink = (path) => {
    return `${baseLink}${path}`;
};

const dashboardRoutesList = [
    {
        label: "Home",
        component: HomePage,
        link: "/",
        routeProps: {
            exact: true,
        },
    },
    {
        label: "Users",
        component: UsersPage,
        link: "/users",
    },
];

export { dashboardRoutesList };
