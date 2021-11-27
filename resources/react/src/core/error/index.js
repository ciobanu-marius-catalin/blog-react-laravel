import { ErrorBoundary } from "react-error-boundary";
import { Alert } from "react-bootstrap";
function ErrorHandler({ children }) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    );
}

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <Alert variant="danger">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </Alert>
    );
}

export { ErrorHandler };
