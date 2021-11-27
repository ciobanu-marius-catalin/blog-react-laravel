import React from "react";
import { NotFound } from "./404";
import { generateLinkPrefixFunction } from "../utils";
import { FrontLayout } from "../../layouts/front";


const systemRoutesList = [
    {
        id: "404",
        label: "404",
        component: NotFound,
        layout: FrontLayout,
        link: "*",
    },
];

export { systemRoutesList };
