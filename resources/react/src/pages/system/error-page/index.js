import { ErrorComponent } from "../components/error-component";

function ErrorPage() {
    return (
        <ErrorComponent
            errorCode="500"
            title="Internal Server Error"
            description="Something went wrong. Please try again later."
        />
    );
}

export { ErrorPage };
