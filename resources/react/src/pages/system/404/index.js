import { ErrorComponent } from "../components/error-component";

function NotFound() {
    return (
        <ErrorComponent
            errorCode="404"
            title="Not Found"
            description="The resource requested could not be found"
        />
    );
}

export { NotFound };
