import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { routesList } from "@/pages";
import _ from "lodash";
import { Container, Nav, Navbar, NavItem } from "react-bootstrap";

const PageLayout = () => {
    console.log("page layout");
    return (
        <Router>
            <Navigation />
            <Header />
            <Content />
        </Router>
    );
};

function Navigation() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
              Blog
            </Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    {routesList.map((route) => {
                        return (
                            <NavItem key={route.link}>
                                <Nav.Link as={Link} to={route.link}>
                                    {route.label}
                                </Nav.Link>
                            </NavItem>
                        );
                    })}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function Header() {
    return (
        <header className="bg-dark py-5">
            <Container className="px-4 px-lg-5 my-5 text-center text-white">
                Header
            </Container>
        </header>
    );
}

function Content() {
    return (
        <Container>
            <Switch>
                {routesList.map((route) => {
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
        </Container>
    );
}

export { PageLayout };
