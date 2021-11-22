import { LoginPage } from "./login";
import { LogoutPage } from "./logout";
import { RegisterPage } from "./register";
import _ from "lodash";
import { generateLinkPrefixFunction } from "../utils";
import { DashboardLayout } from "../../layouts/dashboard/index";
const getLink = generateLinkPrefixFunction();

let authRoutesList = [
    {
        id: "login",
        label: "Login",
        component: LoginPage,
        link: getLink("/login"),
    },
    {
        id: "logout",
        label: "Logout",
        icon: "sign-out-alt",
        component: LogoutPage,
        link: getLink("/logout"),
    },
    {
        id: "register",
        label: "Register",
        component: RegisterPage,
        link: getLink("/register"),
    },
];

authRoutesList.forEach((item) => {
    item.layout = DashboardLayout;
});

const authRoutesListById = _.keyBy(authRoutesList, "id");

export { authRoutesList, authRoutesListById };
