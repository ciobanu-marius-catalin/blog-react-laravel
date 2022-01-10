import { CrudForm } from "@/components";
import { useNamespacedSelector, USER_MODULE } from "@/store";
import _ from "lodash";

let settings = [
    {
        label: "Title",
        setting: "title",
        type: "input",
    },
    {
        label: "Content",
        setting: "content",
        as: "textarea",
        rows: 10,
    },
];

const PostsPageForm = (props) => {
    console.log("edit PostsPageForm");
    const { getUser } = useNamespacedSelector(USER_MODULE);
    let user = getUser();
    const onBeforeSubmit = (formData) => {
        let userId = _.get(user, "id");
        _.set(formData, "author_id", userId);
        return formData;
    };
    return (
        <CrudForm
            settings={settings}
            {...props}
            onBeforeSubmit={onBeforeSubmit}
        />
    );
};

export { PostsPageForm, settings };
