import { CrudForm } from "@/components";

let settings = [
    {
        label: "Name",
        setting: "name",
        type: "input",
    },
    {
        label: "Email",
        setting: "email",
        type: "email",
    },
    {
        label: "Password",
        setting: "password",
        type: "password",
    },
    {
        label: "Confirm password",
        setting: "confirmPassword",
        type: "password",
    },
];

const UsersPageForm = (props) => {
    console.log("edit page");
    return <CrudForm settings={settings} {...props} />;
};

export { UsersPageForm, settings };
