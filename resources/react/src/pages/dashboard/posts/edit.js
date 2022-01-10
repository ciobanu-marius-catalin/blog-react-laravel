import { PostsPageForm, settings } from "./form";
import { useLocation } from "react-router-dom";

const editSettings = settings;

const PostsPageEdit = () => {
    console.log("edit page");
    const location = useLocation();
    let search = location.search;
    let id;
    try {
        const urlSearchParams = new URLSearchParams(search);
        id = urlSearchParams.get("id");
    } catch (e) {}

    let localApiPath = `/posts/${id}`;
    return (
        <PostsPageForm
            settings={editSettings}
            localApiPath={localApiPath}
            loadData={true}
            method={"put"}
        />
    );
};

export { PostsPageEdit };
