import { DashboardLayout } from "../../../layouts/dashboard";
import { PostsPage, PostsPageAdd, PostsPageEdit } from "./index";

import { generateLinkPrefixFunction } from "../../utils";

const getDashboardLink = generateLinkPrefixFunction("dashboard");

let postsRoutes = [
    {
        id: "posts-edit",
        hidden: true,
        protected: true,
        component: PostsPageEdit,
        layout: DashboardLayout,
        link: getDashboardLink("/posts/edit"),
    },
    {
        id: "posts-add",
        hidden: true,
        protected: true,
        component: PostsPageAdd,
        layout: DashboardLayout,
        link: getDashboardLink("/posts/add"),
        routeProps: {
            exact: true,
        },
    },
    {
        id: "posts",
        label: "Posts",
        icon: "users",
        protected: true,
        component: PostsPage,
        layout: DashboardLayout,
        link: getDashboardLink("/posts"),
    },
];

export { postsRoutes };
