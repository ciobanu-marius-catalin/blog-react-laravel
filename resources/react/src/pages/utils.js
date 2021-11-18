const generateLinkPrefixFunction = (prefix) => {
    return (link) => {
        return link;
        // return `${preifx}${link}`;
    };
};

export { generateLinkPrefixFunction };
