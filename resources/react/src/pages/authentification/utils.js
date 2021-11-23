function redirectToPage(page) {
    console.log('redirect');
    let baseUrl = window.backendData.rootUrl;
    let pageUrl = `${baseUrl}/${page}`;
    window.location.replace(pageUrl);
}

export { redirectToPage };
