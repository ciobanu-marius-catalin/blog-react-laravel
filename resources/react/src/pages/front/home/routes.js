import React from "react";
import { HomePage } from "./index";
import { PostPage } from "./post-page";

import { FrontLayout } from "../../../layouts/front";

const frontRoutesList = [
    {
        id: "home",
        label: "Home",
        component: HomePage,
        layout: FrontLayout,
        routeProps: {
            exact: true,
        },
        link: "/",
    },
    {
        id: "single-post",
        hidden: true,
        component: PostPage,
        layout: FrontLayout,
        link: "/post",
    }
];

export { frontRoutesList };
