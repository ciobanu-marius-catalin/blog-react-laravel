import { dashboardRoutesList } from "./dashboard";
import { authRoutesList } from "./authentification";


const routesList = dashboardRoutesList.concat(authRoutesList);

export { routesList };
export * from "./dashboard";
export * from "./authentification";
