import _ from "lodash";
import { useLocation } from "react-router-dom";

function getBackendData(path, defaultValue) {
    return _.get(window, `backendData.${path}`, defaultValue);
}
const rootUrl = getBackendData("rootUrl");

const apiRootUrl = `${rootUrl}/api`;

function getRootUrl() {
    return rootUrl;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = document.cookie;
    console.log("get cookie");
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
function removeDuplicateSlashes(content = "") {
    return content.replace(/([^:]\/)\/+/g, "$1");
}

export {
    getBackendData,
    getCookie,
    getRootUrl,
    rootUrl,
    apiRootUrl,
    removeDuplicateSlashes,
};
