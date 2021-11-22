import React from "react";
import { HomePage } from "./home";

import { generateLinkPrefixFunction } from "../utils";
import { FrontLayout } from "../../layouts/front";

const getLink = generateLinkPrefixFunction();

const frontRoutesList = [
    {
        id: "home",
        label: "Home",
        component: HomePage,
        layout: FrontLayout,
        routeProps: {
            exact: true,
        },
        link: getLink("/"),
    },
];

export { frontRoutesList };
