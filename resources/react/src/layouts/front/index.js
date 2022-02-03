import { Link } from "react-router-dom";
import { ErrorHandler } from "@/core";
import { Navbar, Container, Nav } from "react-bootstrap";

const FrontLayout = ({ children }) => {
    return (
        <div className="gravity-front-layout">
            <Header />
            <Content>{children}</Content>
        </div>
    );
};
function TopBar() {
    return (
        <Navbar className="gravity-front-layout__top-bar" bg="dark">
            <div className="d-flex justify-content-between w-100">
                <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                </Nav.Link>
                <UserMenu />
            </div>
        </Navbar>
    );
}

function Navigation() {
    return (
        <Navbar className="gravity-front-layout__navigation">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Blog
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            Blog
                        </Nav.Link>
                        <Nav.Link as={Link} to="https://catalinciobanu.com/#about-me">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="https://catalinciobanu.com/#contact">
                            Contact
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
function Header() {
    return (
        <>
            <TopBar />
            <Navigation />
        </>
    );
}

function UserMenu() {
    return (
        <Nav.Link as={Link} to="/dashboard">
            Admin
        </Nav.Link>
    );
}

function Content({ children }) {
    return <>{children}</>;
}

export { FrontLayout };
export default FrontLayout;
