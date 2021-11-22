const generateLinkPrefixFunction = (prefix = "") => {
    return (link) => {
        return `/${prefix}${link}`;
    };
};

export { generateLinkPrefixFunction };
