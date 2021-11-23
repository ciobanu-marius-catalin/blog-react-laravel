const getUser = (state) => state?.user?.user;

const getIsLoggedIn = (state) => !!state?.user?.user;

export { getUser, getIsLoggedIn };
