function ErrorComponent({ errorCode, title, description }) {
    return (
        <div className="error-page">
            <h1 className="error-page__code">{errorCode}</h1>
            <p className="error-page__title">{title}</p>
            <p className="error-page__description">{description}</p>
        </div>
    );
}

export { ErrorComponent };
