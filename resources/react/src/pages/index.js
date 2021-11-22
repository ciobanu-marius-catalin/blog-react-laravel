import { dashboardRoutesList } from "./dashboard";
import { authRoutesList } from "./authentification";
import { frontRoutesList } from "./front";

const routesList = dashboardRoutesList.concat(authRoutesList, frontRoutesList);

export { routesList };
export * from "./dashboard";
export * from "./authentification";
export * from "./front";
