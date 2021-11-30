import _ from "lodash";

function getBackendData(path, defaultValue) {
    return _.get(window, `backendData.${path}`, defaultValue);
}
const rootUrl = getBackendData("rootUrl");
function getRootUrl() {
    return rootUrl;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = document.cookie;
    console.log('get cookie');
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export { getBackendData, getCookie, getRootUrl, rootUrl };
