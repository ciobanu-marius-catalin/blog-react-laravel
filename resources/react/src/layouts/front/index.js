import { Link } from "react-router-dom";
import { frontRoutesList, dashboardRoutesById } from "../../pages";
import _ from "lodash";
import { ErrorHandler } from "@/core";

const FrontLayout = ({ children }) => {
    return (
        <div>
            <h1>Front layout</h1>
            <Header />
            <Content>{children}</Content>
        </div>
    );
};

function Header() {
    let routes = _.cloneDeep(frontRoutesList);
    routes.push(dashboardRoutesById.home);
    return (
        <ul>
            {routes.map((route) => {
                return (
                    <li key={route.link}>
                        <Link to={route.link}>{route.label}</Link>
                    </li>
                );
            })}
        </ul>
    );
}

function Content({ children }) {
    return (
        <div>
            <ErrorHandler>{children}</ErrorHandler>
        </div>
    );
}

export { FrontLayout };
export default FrontLayout;
