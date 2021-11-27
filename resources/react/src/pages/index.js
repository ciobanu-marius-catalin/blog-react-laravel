import { dashboardRoutesList } from "./dashboard";
import { authRoutesList } from "./authentification";
import { frontRoutesList } from "./front";
import { systemRoutesList } from "./system";

const routesList = dashboardRoutesList.concat(
    authRoutesList,
    frontRoutesList,
    systemRoutesList
);

export { routesList };
export * from "./dashboard";
export * from "./authentification";
export * from "./front";
