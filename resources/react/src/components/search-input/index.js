import classnames from "classnames";
import { Icon } from "../icon";

function SearchInput({ className, ...props }) {
    return (
        <div className="gravity-search-input">
            <Icon name="search" />
            <input
                className={classnames(
                    className,
                    "gravity-search-input__control"
                )}
                {...props}
            />
        </div>
    );
}

export { SearchInput };
