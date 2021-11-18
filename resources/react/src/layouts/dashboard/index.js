import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    dashboardRoutesList,
    authRoutesList,
    authRoutesListById,
} from "../../pages";
import _ from "lodash";
import { Container, Nav, Navbar, NavItem, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { Icon } from "@/components";

const PageLayout = () => {
    console.log("page layout test");
    return (
        <Row className={"gravity-dashboard-layout__container g-0"}>
            <Sidebar />
            <Content />
        </Row>
    );
};

function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const logoutRoute = _.get(authRoutesListById, "logout");
    return (
        <Col xs="auto" className="gravity-dashboard-layout__sidebar text-white">
            <Navbar bg="dark" variant="dark" className="p-3">
                <Navbar.Brand as={Link} to="/">
                    Blog
                </Navbar.Brand>
                <hr className="w-100" />
                <Navbar.Collapse>
                    <Nav className="mr-auto" variant="pills">
                        <div
                            className={
                                "gravity-dashboard-layout__sidebar__main-nav"
                            }
                        >
                            {dashboardRoutesList.map((route) => {
                                const isActive = currentPath === route.link;
                                return (
                                    <NavItem key={route.link}>
                                        <Nav.Link
                                            as={Link}
                                            to={route.link}
                                            className={classnames({
                                                active: isActive,
                                            })}
                                        >
                                            {route.icon && (
                                                <Icon name={route.icon} />
                                            )}
                                            <span className="gravity-dashboard-layout__label">
                                                {route.label}
                                            </span>
                                        </Nav.Link>
                                    </NavItem>
                                );
                            })}
                        </div>
                        <hr className="w-100" />
                        <div className="gravity-dashboard-layout__sidebar__footer">
                            <NavItem>
                                <Nav.Link as={Link} to={logoutRoute.link}>
                                    {logoutRoute.icon && (
                                        <Icon name={logoutRoute.icon} />
                                    )}
                                    <span className="gravity-dashboard-layout__label">
                                        {logoutRoute.label}
                                    </span>
                                </Nav.Link>
                            </NavItem>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col>
    );
}

function Content() {
    let routes = authRoutesList.concat(dashboardRoutesList);
    return (
        <Col className="gravity-dashboard-layout__content p-3">
            <Switch>
                {routes.map((route) => {
                    const PageComponent = route.component;
                    const routeProps = _.get(route, "routeProps", {});
                    return (
                        <Route
                            key={route.link}
                            path={route.link}
                            {...routeProps}
                        >
                            <PageComponent />
                        </Route>
                    );
                })}
            </Switch>
        </Col>
    );
}

export { PageLayout };
