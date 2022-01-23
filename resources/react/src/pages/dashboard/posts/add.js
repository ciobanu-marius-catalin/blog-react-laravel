import { PostsPageForm } from "./form";

const PostsPageAdd = () => {
    console.log("edit page");
    return <PostsPageForm localApiPath="/admin/posts" />;
};

export { PostsPageAdd };
