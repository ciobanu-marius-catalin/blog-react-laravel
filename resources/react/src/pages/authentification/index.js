import { LoginPage } from "./login";
import { LogoutPage } from "./logout";
import { RegisterPage } from "./register";
import _ from "lodash";
import { generateLinkPrefixFunction } from "../utils";
import { FrontLayout } from "../../layouts/front/index";
const getLink = generateLinkPrefixFunction();

let authRoutesList = [
    // {
    //     id: "login",
    //     label: "Login",
    //     component: LoginPage,
    //     link: getLink("login"),
    // },
    // {
    //     id: "logout",
    //     label: "Logout",
    //     icon: "sign-out-alt",
    //     component: LogoutPage,
    //     link: getLink("logout"),
    // },
    // {
    //     id: "register",
    //     label: "Register",
    //     component: RegisterPage,
    //     link: getLink("register"),
    // },
];

console.log("auth");

authRoutesList.forEach((item) => {
    item.layout = FrontLayout;
});

const authRoutesListById = _.keyBy(authRoutesList, "id");

export { authRoutesList, authRoutesListById };
