import classnames from "classnames";

const Icon = ({ name, className }) => {
    return (
        <i
            className={classnames("gravity-icon fas", `fa-${name}`, className)}
        />
    );
};

export { Icon };
