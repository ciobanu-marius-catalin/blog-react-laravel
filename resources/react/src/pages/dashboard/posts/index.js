import { CrudTable } from "@/components";

const PostsPage = () => {
    let columnNames = ["id", "title", "author_id"];
    return <CrudTable localApiPath="/posts" columnNames={columnNames} />;
};

export * from "./edit";
export * from "./add";
export { PostsPage };
