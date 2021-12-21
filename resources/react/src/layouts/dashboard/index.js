import React from "react";
import { Link } from "react-router-dom";
import {
    dashboardRoutesList,
    authRoutesList,
    authRoutesListById,
} from "../../pages";
import _ from "lodash";
import { Container, Nav, Navbar, NavItem, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { ErrorHandler } from "@/core";
import { Icon } from "@/components";

function DashboardLayout({ children }) {
    console.log("page layout test");
    return (
        <Row className={"gravity-dashboard-layout__container g-0"}>
            <Sidebar />
            <Content>{children}</Content>
        </Row>
    );
}
let routes = dashboardRoutesList.filter((route) => !route.hidden);

console.log("routes");

function Sidebar() {
    console.log("sidebar");
    const location = useLocation();
    const currentPath = location.pathname;

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
                            {routes.map((route) => {
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
                        <SidebarFooter />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col>
    );
}

function SidebarFooter() {
    const logoutRoute = _.get(authRoutesListById, "logout");
    const rootUrl = _.get(window.backendData, "rootUrl");
    const logoutUrl = `${rootUrl}/logout`;
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    return (
        <div className="gravity-dashboard-layout__sidebar__footer">
            <form id="logoutForm" action={logoutUrl} method="POST">
                <input name="_token" value={csrfToken} type="hidden" />
                <NavItem>
                    <Nav.Link
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("submit");
                            const form = document.querySelector("#logoutForm");
                            if (!form) {
                                return;
                            }
                            form.submit();
                        }}
                    >
                        {logoutRoute.icon && <Icon name={logoutRoute.icon} />}
                        <span className="gravity-dashboard-layout__label">
                            {logoutRoute.label}
                        </span>
                    </Nav.Link>
                </NavItem>
            </form>
        </div>
    );
}

function Content({ children }) {
    return (
        <Col className="gravity-dashboard-layout__content p-3">
            <ErrorHandler>{children}</ErrorHandler>
        </Col>
    );
}

export { DashboardLayout };
export default DashboardLayout;
